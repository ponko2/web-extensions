import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    sortImports: {},
  },
  lint: {
    categories: {
      correctness: "error",
      pedantic: "warn",
      suspicious: "warn",
    },
    options: {
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
      typeAware: true,
      typeCheck: true,
    },
    plugins: ["eslint", "import", "jsdoc", "oxc", "promise", "typescript", "unicorn"],
  },
  staged: {
    "*": ["editorconfig-checker", "vp check --fix"],
    "*.{yaml,yml}": "yamllint --list-files --strict",
  },
});
