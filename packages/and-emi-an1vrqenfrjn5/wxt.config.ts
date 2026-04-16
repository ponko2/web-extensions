import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "&emi=AN1VRQENFRJN5",
    action: {},
    host_permissions: ["*://www.amazon.co.jp/*"],
    permissions: ["declarativeNetRequest", "declarativeNetRequestWithHostAccess", "storage"],
  },
});
