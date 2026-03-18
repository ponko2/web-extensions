export default defineContentScript({
  runAt: "document_start",
  matches: ["*://chatgpt.com/*"],
  main() {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
  },
});

// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.target instanceof HTMLElement &&
    event.target.id === "prompt-textarea" &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey)
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
