import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, astro, react],
  ignorePatterns: core.ignorePatterns,
  // ponytail: keep Ultracite useful without renaming/refactoring the existing app.
  rules: {
    curly: "off",
    eqeqeq: "off",
    "func-style": "off",
    "import/consistent-type-specifier-style": "off",
    "no-empty-function": "off",
    "no-eq-null": "off",
    "no-implicit-globals": "off",
    "no-inline-comments": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-use-before-define": "off",
    "prefer-const": "off",
    "prefer-destructuring": "off",
    "promise/prefer-await-to-then": "off",
    "react/function-component-definition": "off",
    "require-unicode-regexp": "off",
    "sort-keys": "off",
    "typescript/array-type": "off",
    "typescript/consistent-type-definitions": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/numeric-separators-style": "off",
    // parseFloat/parseInt are intentional: CSS durations like "0.3s" become NaN with Number().
    "unicorn/prefer-number-coercion": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prefer-spread": "off",
  },
});
