import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Refined Assistants",
    host_permissions: [
      "*://chatgpt.com/*",
      "*://claude.ai/*",
      "*://copilot.github.com/*",
      "*://gemini.google.com/*",
      "*://github.com/copilot/*",
    ],
  },
});
