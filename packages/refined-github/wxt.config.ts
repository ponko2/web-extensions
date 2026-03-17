import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Refined GitHub",
    host_permissions: ["*://github.com/*", "*://gist.github.com/*"],
    permissions: ["contextMenus"],
  },
});
