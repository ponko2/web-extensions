import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    sortImports: {},
  },
  lint: {
    options: {
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
