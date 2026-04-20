const selectors = [
  // Open all resolved comment threads
  'details[data-resolved="true"]:not([open])',
  // Close all resolved comment threads
  'details[data-resolved="true"][open]',
  // Mark all files as viewed
  'button[class*="MarkAsViewedButton"][aria-pressed="false"]',
  "input.js-reviewed-checkbox:not(:checked)",
  // Mark all files as unviewed
  'button[class*="MarkAsViewedButton"][aria-pressed="true"]',
  "input.js-reviewed-checkbox:checked",
  // Load all hidden diffs
  '[class^="HiddenDiffPatch"] button',
  ".js-file .js-diff-load",
];

const handleClick = (event: MouseEvent) => {
  const { target } = event;
  if (!event.isTrusted || !event.altKey || !(target instanceof HTMLElement)) {
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
