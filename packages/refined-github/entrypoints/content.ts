import { objectEntries } from "ts-extras";

/**
 * 全ての要素をクリック
 *
 * @param {string[]} selectors セレクター
 */
const clickElements = (selectors: string[]) => {
  document.querySelectorAll(selectors.join(",")).forEach((element) => {
    if (element instanceof HTMLElement) {
      element.click();
    }
  });
};

/**
 * 全ての詳細折りたたみ要素を切り替え
 *
 * @param {string[]} selectors セレクター
 */
const toggleDetails = (selectors: string[]) => {
  document.querySelectorAll(selectors.join(",")).forEach((element) => {
    if (element instanceof HTMLDetailsElement) {
      element.open = !element.open;
    }
  });
};

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
    selectors: [".js-reviewed-checkbox"],
  },
  /**
   * 全てのファイルをレビュー済みに変更
   */
  changeFilesToReviewed: {
    action: clickElements,
    selectors: [".js-reviewed-checkbox:not(:checked)"],
  },
  /**
   * 全てのファイルを未レビュー状態に変更
   */
  changeFilesToUnreviewed: {
    action: clickElements,
    selectors: [".js-reviewed-checkbox:checked"],
  },
  /**
   * 差分を全て読み込む
   */
  loadDiffs: {
    action: clickElements,
    selectors: [".js-diff-load"],
  },
};

/**
 * 要素が存在するかを確認
 *
 * @param {string[]} selectors セレクター
 * @returns {boolean} 要素が存在する場合はtrue
 */
const hasElement = (selectors: string[]): boolean =>
  document.querySelector(selectors.join(",")) !== null;

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
