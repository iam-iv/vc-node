export default {
  transform: {
    "ˆ.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./src.*\\.test?\\.(js|ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "json", "js"],
  rootDir: "_tests",
};
