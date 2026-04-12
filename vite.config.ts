import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    sortImports: {},
  },
  lint: {
    categories: {
      correctness: "error",
      pedantic: "warn",
      perf: "warn",
      style: "warn",
      suspicious: "warn",
    },
    options: {
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
      typeAware: true,
      typeCheck: true,
    },
    plugins: ["eslint", "import", "jsdoc", "oxc", "promise", "typescript", "unicorn"],
    rules: {
      "eslint/capitalized-comments": "off",
      "eslint/no-duplicate-imports": ["warn", { allowSeparateTypeImports: true }],
      "eslint/no-magic-numbers": "off",
      "eslint/no-ternary": "off",
      "eslint/sort-imports": "off",
      "eslint/sort-keys": "off",
      "import/exports-last": "off",
      "import/group-exports": "off",
      "import/no-named-export": "off",
      "import/prefer-default-export": "off",
      "promise/prefer-await-to-callbacks": "off",
      "unicorn/prefer-global-this": "off",
    },
  },
  staged: {
    "*": ["editorconfig-checker", "vp check --fix"],
    "*.nix": ["deadnix --edit", (files) => files.map((file) => `statix fix -- ${file}`), "nixfmt"],
    "*.{yaml,yml}": "yamllint --list-files --strict",
  },
});
