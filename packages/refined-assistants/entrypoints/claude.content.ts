// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey) &&
    event.target instanceof HTMLElement &&
    event.target.dataset["testid"] === "chat-input" &&
    event.target.contentEditable === "true"
  ) {
    event.stopPropagation();
  }
};

export default defineContentScript({
  runAt: "document_start",
  matches: ["*://claude.ai/*"],
  main(ctx) {
    ctx.addEventListener(document, "keydown", handleKeyDown, { capture: true });
  },
});
