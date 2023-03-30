module.exports = {
  globals: {
    JSX: "readonly",
    IntersectionObserverInit: "readonly",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended", // React hooks rules
    "prettier", // Prettier plugin
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: { react: { version: "detect" } },
  rules: {
    "sort-imports": ["error", { ignoreDeclarationSort: true }], // Require imports to be sorted abc
    "react/prop-types": "off", // Use TypeScript's types for component props instead
    "react/react-in-jsx-scope": "off", // No need to import React when using Next.js
    "jsx-a11y/anchor-is-valid": "off", // This rule is not compatible with Next.js's <Link /> components
    "@typescript-eslint/no-unused-vars": ["error"], // Enforce no unused vars
    "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }], // Includes .prettierrc.js rules
    "no-redeclare": "off", // Allows function overloading
    // "import/order": [
    //   "error",
    //   {
    //     groups: [["external", "builtin"], "internal", ["sibling", "parent"], "index"],
    //     pathGroups: [
    //       {
    //         pattern: "@(react|react-native)",
    //         group: "external",
    //         position: "before",
    //       },
    //       {
    //         pattern: "@src/**",
    //         group: "internal",
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ["internal", "react"],
    //     "newlines-between": "always",
    //     alphabetize: {
    //       order: "asc",
    //       caseInsensitive: true,
    //     },
    //   },
    // ],
  },
};
