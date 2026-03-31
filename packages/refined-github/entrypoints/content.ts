import { objectEntries } from "ts-extras";

import type { InvokeMenuItemFunctionMessage } from "~/entrypoints/background";

export default defineContentScript({
  runAt: "document_start",
  matches: ["*://github.com/*", "*://gist.github.com/*"],
  main(ctx) {
    browser.runtime.onMessage.addListener(handleInvokeMenuItemFunctionMessage);
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
    ctx.addEventListener(document, "turbo:load", toggleMenuItemVisibility);
    ctx.addEventListener(document, "contextmenu", toggleMenuItemVisibility);
  },
});

export interface ToggleMenuItemVisibilityMessage {
  type: "toggleMenuItemVisibility";
  menuItemId: MenuItemId;
  visible: boolean;
}

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

const menuItems: Record<MenuItemId, { action?: () => void; visibilitySelector: string }> = {
  /**
   * 解決済コメントの開閉状態を切り替え
   */
  toggleResolvedDetails: {
    visibilitySelector: 'details[data-resolved="true"]',
  },
  /**
   * 解決済のコメントを全て開く
   */
  openResolvedDetails: {
    action() {
      toggleDetails('details[data-resolved="true"]:not([open])');
    },
    visibilitySelector: 'details[data-resolved="true"]:not([open])',
  },
  /**
   * 解決済のコメントを全て閉じる
   */
  closeResolvedDetails: {
    action() {
      toggleDetails('details[data-resolved="true"][open]');
    },
    visibilitySelector: 'details[data-resolved="true"][open]',
  },
  /**
   * ファイルの確認状態を切り替え
   */
  toggleFilesToReviewed: {
    visibilitySelector: ".js-reviewed-checkbox",
  },
  /**
   * 全てのファイルをレビュー済みに変更
   */
  changeFilesToReviewed: {
    action() {
      clickElements(".js-reviewed-checkbox:not(:checked)");
    },
    visibilitySelector: ".js-reviewed-checkbox:not(:checked)",
  },
  /**
   * 全てのファイルを未レビュー状態に変更
   */
  changeFilesToUnreviewed: {
    action() {
      clickElements(".js-reviewed-checkbox:checked");
    },
    visibilitySelector: ".js-reviewed-checkbox:checked",
  },
  /**
   * 差分を全て読み込む
   */
  loadDiffs: {
    action() {
      clickElements(".js-diff-load");
    },
    visibilitySelector: ".js-diff-load",
  },
};

// コンテキストメニューに対応する関数を実行
const handleInvokeMenuItemFunctionMessage = ({
  type,
  menuItemId,
}: InvokeMenuItemFunctionMessage) => {
  if (type === "invokeMenuItemFunction" && isMenuItemId(menuItemId)) {
    menuItems[menuItemId].action?.();
  }
};

// 不要なコンテキストメニューを非表示化
const toggleMenuItemVisibility = () => {
  for (const [menuItemId, { visibilitySelector }] of objectEntries(menuItems)) {
    void browser.runtime.sendMessage({
      type: "toggleMenuItemVisibility",
      menuItemId,
      visible: hasElement(visibilitySelector),
    } satisfies ToggleMenuItemVisibilityMessage);
  }
};

/**
 * 要素が存在するかを確認
 *
 * @param {string} selectors セレクター
 * @returns {boolean} 要素が存在する場合はtrue
 */
const hasElement = (selectors: string): boolean => document.querySelector(selectors) !== null;

/**
 * 全ての詳細折りたたみ要素を切り替え
 *
 * @param {string} selectors セレクター
 */
const toggleDetails = (selectors: string) => {
  for (const element of document.querySelectorAll(selectors)) {
    if (element instanceof HTMLDetailsElement) {
      element.open = !element.open;
    }
  }
};

/**
 * 全ての要素をクリック
 *
 * @param {string} selectors セレクター
 */
const clickElements = (selectors: string) => {
  for (const element of document.querySelectorAll(selectors)) {
    if (element instanceof HTMLElement) {
      element.click();
    }
  }
};
