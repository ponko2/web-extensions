import { objectEntries } from "ts-extras";

const menuItems: Record<
  MenuItemId,
  {
    action?: (selectors: string[]) => void;
    selectors: string[];
  }
> = {
  /**
   * 解決済コメントの開閉状態を切り替え
   */
  toggleResolvedDetails: {
    selectors: ['details[data-resolved="true"]'],
  },
  /**
   * 解決済のコメントを全て開く
   */
  openResolvedDetails: {
    action: toggleDetails,
    selectors: ['details[data-resolved="true"]:not([open])'],
  },
  /**
   * 解決済のコメントを全て閉じる
   */
  closeResolvedDetails: {
    action: toggleDetails,
    selectors: ['details[data-resolved="true"][open]'],
  },
  /**
   * ファイルの確認状態を切り替え
   */
  toggleFilesToReviewed: {
    selectors: ['button[class*="MarkAsViewedButton"]', "input.js-reviewed-checkbox"],
  },
  /**
   * 全てのファイルをレビュー済みに変更
   */
  changeFilesToReviewed: {
    action: clickElements,
    selectors: [
      'button[class*="MarkAsViewedButton"][aria-pressed="false"]',
      "input.js-reviewed-checkbox:not(:checked)",
    ],
  },
  /**
   * 全てのファイルを未レビュー状態に変更
   */
  changeFilesToUnreviewed: {
    action: clickElements,
    selectors: [
      'button[class*="MarkAsViewedButton"][aria-pressed="true"]',
      "input.js-reviewed-checkbox:checked",
    ],
  },
  /**
   * 差分を全て読み込む
   */
  loadDiffs: {
    action: clickElements,
    selectors: ['[class^="HiddenDiffPatch"] button', ".js-file .js-diff-load"],
  },
};

// コンテキストメニューに対応する関数を実行
const onInvokeMenuItemFunction = ({
  data: { menuItemId },
}: MessageOf<"invokeMenuItemFunction">) => {
  if (isMenuItemId(menuItemId)) {
    const { action, selectors } = menuItems[menuItemId];
    action?.(selectors);
  }
};

// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey) &&
    event.target instanceof HTMLElement &&
    event.target.tagName === "TEXTAREA"
  ) {
    event.stopPropagation();
  }
};

// 不要なコンテキストメニューを非表示化
const toggleMenuItemVisibility = () => {
  for (const [menuItemId, { selectors }] of objectEntries(menuItems)) {
    void sendMessage("toggleMenuItemVisibility", {
      menuItemId,
      visible: hasElement(selectors),
    });
  }
};

export default defineContentScript({
  runAt: "document_start",
  matches: ["*://github.com/*", "*://gist.github.com/*"],
  main(ctx) {
    onMessage("invokeMenuItemFunction", onInvokeMenuItemFunction);
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
    ctx.addEventListener(document, "turbo:load", toggleMenuItemVisibility);
    ctx.addEventListener(document, "contextmenu", toggleMenuItemVisibility);
  },
});
