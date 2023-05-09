module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "prettier/prettier": "error",
    },
    overrides: [
      {
        files: [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/**/*.spec.{j,t}s?(x)",
        ],
        env: {
          jest: true,
        },
      },
    ],
  };
  