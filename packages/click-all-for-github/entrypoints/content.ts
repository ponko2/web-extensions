const selectors = [
  // Open all resolved comment threads
  'button[data-telemetry-action="pull_requests.thread.expand"]',
  'button[data-action="click:review-thread-collapsible#toggle"][aria-expanded="false"]',
  // Close all resolved comment threads
  'button[data-telemetry-action="pull_requests.thread.collapse"]',
  'button[data-action="click:review-thread-collapsible#toggle"][aria-expanded="true"]',
  // Mark all files as viewed
  'button[data-telemetry-action="pull_requests.diff.toggle_viewed"][aria-pressed="false"]',
  "input.js-reviewed-checkbox:not(:checked)",
  // Mark all files as unviewed
  'button[data-telemetry-action="pull_requests.diff.toggle_viewed"][aria-pressed="true"]',
  "input.js-reviewed-checkbox:checked",
  // Load all hidden diffs
  'button[data-telemetry-action="pull_requests.diff.load_more"]',
  "button.load-diff-button",
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
  matches: ["*://*.github.com/*"],
  main(ctx) {
    ctx.addEventListener(document, "click", handleClick, { capture: true });
  },
});
