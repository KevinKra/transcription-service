/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  // cypress uses the chai assertion library
  testPathIgnorePatterns: ["./cypress"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
