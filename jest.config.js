module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/(?!formidable)"],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
};
