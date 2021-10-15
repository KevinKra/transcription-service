module.exports = {
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:testing-library/react",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-unsafe-call": 2,
  },
  overrides: [
    {
      files: ["./cypress/**/*.spec.ts"],
      rules: {
        // jest/no-export: 0 allows for ts-config isolatedModules to remain true for app
        "jest/no-export": 0,
        // jest/valid expect: 0 cypress uses chai in assertions, this silences jest conflict
        "jest/valid-expect": 0,
        // jest/expect-expect: 0 cypress doesn't handle assertions like jest
        "jest/expect-expect": 0,
        // testing-library/await-async-query: 0 cypress syntax does not require await to work
        "testing-library/await-async-query": 0,
        "testing-library/prefer-screen-queries": 0,
      },
    },
  ],
};
