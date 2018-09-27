const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    "@": path.resolve(__dirname, "../src"),
  };

  return defaultConfig;
};
