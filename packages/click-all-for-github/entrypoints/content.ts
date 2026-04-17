const selectors = [
  // 解決済のコメントを全て開く
  'details[data-resolved="true"]:not([open])',
  // 解決済のコメントを全て閉じる
  'details[data-resolved="true"][open]',
  // 全てのファイルをレビュー済みに変更
  'button[class*="MarkAsViewedButton"][aria-pressed="false"]',
  "input.js-reviewed-checkbox:not(:checked)",
  // 全てのファイルを未レビュー状態に変更
  'button[class*="MarkAsViewedButton"][aria-pressed="true"]',
  "input.js-reviewed-checkbox:checked",
  // 差分を全て読み込む
  '[class^="HiddenDiffPatch"] button',
  ".js-file .js-diff-load",
];

const handleClick = (event: MouseEvent) => {
  if (!event.isTrusted || !event.altKey) {
    return;
  }

  const { target } = event;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const selector = selectors.find((item) => target.closest(item));
  if (selector === undefined) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();

  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    element.click();
  });
};

export default defineContentScript({
  runAt: "document_end",
  matches: ["*://*.github.com/*", "*://github.com/*"],
  main(ctx) {
    ctx.addEventListener(document, "click", handleClick, { capture: true });
  },
});
