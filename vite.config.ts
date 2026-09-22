import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    ignorePatterns: [".mise/locks/**"],
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
    plugins: ["eslint", "import", "jsdoc", "oxc", "promise", "unicorn"],
    rules: {
      "eslint/capitalized-comments": "off",
      "eslint/no-duplicate-imports": ["warn", { allowSeparateTypeImports: true }],
      "eslint/no-magic-numbers": "off",
      "eslint/no-ternary": "off",
      "eslint/one-var": "off",
      "eslint/sort-imports": "off",
      "eslint/sort-keys": "off",
      "import/exports-last": "off",
      "import/group-exports": "off",
      "import/no-named-export": "off",
      "import/prefer-default-export": "off",
      "promise/prefer-await-to-callbacks": "off",
      "unicorn/prefer-global-this": "off",
    },
    overrides: [
      {
        files: ["**/*.cts", "**/*.mts", "**/*.ts", "**/*.tsx"],
        plugins: ["typescript"],
        rules: {
          "typescript/prefer-readonly-parameter-types": "off",
        },
      },
      {
        files: ["**/*.config.js", "**/*.config.ts"],
        rules: {
          "import/no-anonymous-default-export": "off",
        },
      },
    ],
  },
  run: {
    cache: true,
  },
});
