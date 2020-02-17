import path from 'path';

export const loaderOneOf = [
  require.resolve('@kkt/loader-less')
];

/**
 * Bundles a minified and unminified version of UIW including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
export default (conf, options) => {
  if (options.yargsArgs && options.yargsArgs.bundle) {
    const isMini = options.yargsArgs && options.yargsArgs.mini;
    conf.devtool = false;
    const regexp = /(HtmlWebpackPlugin|InlineChunkHtmlPlugin|InterpolateHtmlPlugin|MiniCssExtractPlugin|ManifestPlugin|IgnorePlugin|GenerateSW)/;
    conf.plugins = conf.plugins.map((item) => {
      if (item.constructor && item.constructor.name && regexp.test(item.constructor.name)) {
        return null;
      }
      return item;
    }).filter(Boolean);
    conf.entry = './src/index.tsx';
    conf.output = {
      path: path.join(process.cwd(), 'dist'),
      filename: 'react-hotkeys.js',
      library: 'ReactHotkeys',
      libraryTarget: 'umd',
    }
    conf.output = {
      futureEmitAssets: true,
      path: path.join(process.cwd(), 'dist'),
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
    if (options.yargsArgs && options.yargsArgs.mini) {
      conf.output.filename = 'react-hotkeys.min.js';
    } else {
      conf.optimization.minimize = false;
    }
    conf.optimization = {
      minimize: options.isEnvProduction,
      minimizer: [],
    };

    if (!isMini) {
      conf.optimization.minimize = false;
    }
  } else {
    conf.output = { ...conf.output, publicPath: '.' }
  }
  return conf
}
