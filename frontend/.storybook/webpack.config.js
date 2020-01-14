const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.alias = {
    "@": path.resolve(__dirname, "../src"),
    'vue$': 'vue/dist/vue.esm.js',
  }

  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './.storybook/',
          },
        },
      },
    ],

    include: path.resolve(__dirname, '../'),
  });

  return config;
};
