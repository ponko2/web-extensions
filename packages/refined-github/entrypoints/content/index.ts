import { preventUnexpectedTextareaSubmit } from "./form";
import { onInvokeMenuItemFunction, toggleMenuItemVisibility } from "./menu";

export default defineContentScript({
  runAt: "document_start",
  matches: ["*://github.com/*", "*://gist.github.com/*"],
  main(ctx) {
    onMessage("invokeMenuItemFunction", onInvokeMenuItemFunction);
    ctx.addEventListener(document, "keydown", preventUnexpectedTextareaSubmit, { capture: true });
    ctx.addEventListener(document, "turbo:load", toggleMenuItemVisibility);
    ctx.addEventListener(document, "contextmenu", toggleMenuItemVisibility);
  },
});
