type Finder = (target: Element) => HTMLElement[];

interface FinderOptions {
  selector: string;
  readState?: (element: HTMLElement) => boolean;
}

const createFinder =
  ({ selector, readState }: FinderOptions): Finder =>
  (target) => {
    const operatedElement = target.closest<HTMLElement>(selector);
    if (!operatedElement) {
      return [];
    }

    const similarElements = [...document.querySelectorAll<HTMLElement>(selector)];
    if (!readState) {
      return similarElements;
    }

    const operatedState = readState(operatedElement);
    const isCheckbox =
      operatedElement instanceof HTMLInputElement && operatedElement.type === "checkbox";

    // NOTE: click イベント発火時点で checkbox の checked は更新済みであるため
    const state = isCheckbox ? !operatedState : operatedState;
    return similarElements.filter((element) => readState(element) === state);
  };

const finders: Finder[] = [
  // Resolved comment threads
  createFinder({ selector: 'button[data-telemetry-action="pull_requests.thread.expand"]' }),
  createFinder({ selector: 'button[data-telemetry-action="pull_requests.thread.collapse"]' }),
  createFinder({
    selector: 'button[data-action="click:review-thread-collapsible#toggle"]',
    readState: (element) => element.getAttribute("aria-expanded") === "true",
  }),
  // Viewed files
  createFinder({
    selector: 'button[data-telemetry-action="pull_requests.diff.toggle_viewed"]',
    readState: (element) => element.getAttribute("aria-pressed") === "true",
  }),
  createFinder({
    selector: "input.js-reviewed-checkbox",
    readState: (element) => element instanceof HTMLInputElement && element.checked,
  }),
  // Hidden diffs
  createFinder({ selector: 'button[data-telemetry-action="pull_requests.diff.load_more"]' }),
  createFinder({ selector: "button.load-diff-button" }),
];

const handleClick = (event: MouseEvent) => {
  const { target } = event;
  if (!event.isTrusted || !event.altKey || !(target instanceof Element)) {
    return;
  }

  finders
    .flatMap((finder) => finder(target))
    .filter((element) => !element.contains(target))
    .forEach((element) => {
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
