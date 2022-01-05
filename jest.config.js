module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  //modulePathIgnorePatterns: ["./__tests__/selenium/"],
  // testMatch: [
  //   "<rootDir>/__tests__/pages/*.test.js",
  //   "<rootDir>/__tests__/features/*.test.js",
  //   "<rootDir>/__tests__/getProps/*.test.js",
  //   "<rootDir>/__tests__/components/*.test.js",
  // ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
