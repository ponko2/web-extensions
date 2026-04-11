import type { ContentScriptContext } from "wxt/utils/content-script-context";

import { preventUnexpectedTextareaSubmit } from "./form";
import { onInvokeMenuItemFunction, toggleMenuItemVisibility } from "./menu";

const watchDOM = (ctx: ContentScriptContext, target: Node, callback: () => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const observer = new MutationObserver(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, 200);
  });
  observer.observe(target, { childList: true, subtree: true });
  ctx.onInvalidated(() => {
    clearTimeout(timeoutId);
    observer.disconnect();
  });
  callback();
};

export default defineContentScript({
  runAt: "document_end",
  matches: ["*://github.com/*", "*://gist.github.com/*"],
  main(ctx) {
    onMessage("invokeMenuItemFunction", onInvokeMenuItemFunction);
    watchDOM(ctx, document.body, toggleMenuItemVisibility);
    ctx.addEventListener(document, "keydown", preventUnexpectedTextareaSubmit, { capture: true });
  },
});
