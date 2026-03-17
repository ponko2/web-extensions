import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Refined Amazon",
    host_permissions: ["*://www.amazon.co.jp/*"],
    permissions: ["declarativeNetRequest", "declarativeNetRequestWithHostAccess"],
  },
});
