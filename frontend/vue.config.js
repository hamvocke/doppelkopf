const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "de",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  configureWebpack: {
      plugins: [new BundleAnalyzerPlugin()]
  }
};
