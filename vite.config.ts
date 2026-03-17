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
    "*": ["editorconfig-checker", "vp check --fix"],
    "*.{yaml,yml}": "yamllint --list-files --strict",
  },
});
