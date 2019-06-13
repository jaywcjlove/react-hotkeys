const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/**
 * Bundles a minified and unminified version of UIW including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
module.exports = {
  // Modify the webpack config
  config: (conf, { env, raw, ...other }, webpack) => {
    if (env === 'prod' && raw.BUNDLE) {
      conf.entry = './src/index.tsx';
      conf.output = {
        path: other.appBuildDist,
        filename: 'react-hotkeys.js',
        library: 'ReactHotkeys',
        libraryTarget: 'umd',
      }
      conf.externals = {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      }
      if (raw.BUNDLE !== 'min') conf.optimization.minimize = false;
      if (raw.BUNDLE === 'min') {
        conf.output.filename = 'react-hotkeys.min.js';
        conf.plugins = [
          ...conf.plugins,
        ];
      } else {
        conf.plugins = [
          ...conf.plugins,
        ];
      }
    }
    return conf;
  },
};
