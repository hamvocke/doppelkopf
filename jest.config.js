module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};
