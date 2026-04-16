// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
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
  runAt: "document_end",
  matches: ["*://chatgpt.com/*"],
  main(ctx) {
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
  },
});
