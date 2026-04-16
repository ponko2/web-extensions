import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "&udm=14",
    action: {},
    host_permissions: ["*://www.google.com/search"],
    permissions: ["declarativeNetRequest", "declarativeNetRequestWithHostAccess", "storage"],
  },
});
