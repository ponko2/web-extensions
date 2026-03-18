export default defineContentScript({
  runAt: "document_start",
  matches: ["*://copilot.github.com/*", "*://github.com/copilot/*"],
  main() {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
  },
});

// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.target instanceof HTMLElement &&
    event.target.tagName === "TEXTAREA" &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey)
  ) {
    event.stopPropagation();
  }
};
