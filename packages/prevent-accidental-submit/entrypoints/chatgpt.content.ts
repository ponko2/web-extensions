import { SCRIPT_STARTED_EVENT_TYPE } from "~/events";

// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  // oxlint-disable-next-line typescript/no-deprecated
  const isComposing = event.isComposing || event.keyCode === 229;
  if (
    !isComposing &&
    event.isTrusted &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey) &&
    event.target instanceof HTMLElement &&
    event.target.id === "prompt-textarea"
  ) {
    event.preventDefault();
    event.target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      }),
    );
  }
};

export default defineContentScript({
  runAt: "document_idle",
  matches: ["*://chatgpt.com/*"],
  world: "MAIN",
  main() {
    const eventId = crypto.randomUUID();
    const controller = new AbortController();

    document.dispatchEvent(
      new CustomEvent(SCRIPT_STARTED_EVENT_TYPE, {
        detail: { eventId },
      }),
    );

    document.addEventListener(
      SCRIPT_STARTED_EVENT_TYPE,
      (event) => {
        if (event.detail.eventId !== eventId) {
          controller.abort();
        }
      },
      { signal: controller.signal },
    );

    document.addEventListener("keydown", handleKeyDown, {
      capture: true,
      signal: controller.signal,
    });
  },
});
