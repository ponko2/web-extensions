/**
 * 要素が存在するかを確認
 *
 * @param {string[]} selectors セレクター
 * @returns {boolean} 要素が存在する場合はtrue
 */
export const hasElement = (selectors: string[]): boolean =>
  document.querySelector(selectors.join(",")) !== null;

/**
 * 全ての要素をクリック
 *
 * @param {string[]} selectors セレクター
 */
export const clickElements = (selectors: string[]) => {
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
export const toggleDetails = (selectors: string[]) => {
  document.querySelectorAll(selectors.join(",")).forEach((element) => {
    if (element instanceof HTMLDetailsElement) {
      element.open = !element.open;
    }
  });
};
