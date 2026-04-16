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
    event.target.tagName === "DIV" &&
    event.target.classList.contains("ql-editor") &&
    event.target.contentEditable === "true"
  ) {
    event.stopPropagation();
  }
};

export default defineContentScript({
  runAt: "document_end",
  matches: ["*://gemini.google.com/*"],
  main(ctx) {
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
  },
});
