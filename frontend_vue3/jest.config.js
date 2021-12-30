module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!lodash-es)"
  ],
  testEnvironment: "jsdom"
}
