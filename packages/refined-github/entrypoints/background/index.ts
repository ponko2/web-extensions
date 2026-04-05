import { createContextMenus, handleContextMenuItemClick, onToggleMenuItemVisibility } from "./menu";

export default defineBackground(() => {
  createContextMenus();
  browser.contextMenus.onClicked.addListener(handleContextMenuItemClick);
  onMessage("toggleMenuItemVisibility", onToggleMenuItemVisibility);
});
