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
    event.target.tagName === "TEXTAREA"
  ) {
    event.stopPropagation();
  }
};

export default defineContentScript({
  runAt: "document_end",
  matches: ["*://copilot.github.com/*", "*://github.com/copilot/*"],
  main(ctx) {
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
  },
});
