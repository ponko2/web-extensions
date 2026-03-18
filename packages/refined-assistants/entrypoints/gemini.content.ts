export default defineContentScript({
  runAt: "document_start",
  matches: ["*://gemini.google.com/*"],
  main() {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
  },
});

// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.target instanceof HTMLElement &&
    event.target.tagName === "DIV" &&
    event.target.classList.contains("ql-editor") &&
    event.target.contentEditable === "true" &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey)
  ) {
    event.stopPropagation();
  }
};
