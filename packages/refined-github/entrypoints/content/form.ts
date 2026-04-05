// Form入力中にEnterで意図せずSubmitしてしまう問題を回避
export const preventUnexpectedTextareaSubmit = (event: KeyboardEvent) => {
  if (
    event.isTrusted &&
    event.code === "Enter" &&
    !(event.ctrlKey || event.metaKey) &&
    event.target instanceof HTMLElement &&
    event.target.tagName === "TEXTAREA"
  ) {
    event.stopPropagation();
  }
};
