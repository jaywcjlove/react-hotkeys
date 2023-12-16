import path from 'path';
import webpack, { Configuration } from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from './package.json';

export default (conf: Configuration, env: 'development' | 'production', options: LoaderConfOptions) => {
  if (options.bundle) {
    conf.output!.library = 'react-hot-keys';
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
    };
    conf.plugins!.push(new webpack.BannerPlugin(`react-hotkeys v${pkg.version} \n${pkg.description}\nCopyright (c) ${(new Date()).getFullYear()} ${pkg.author}\nLicensed under the ${pkg.license} license. `));
  } else {
    conf = rawModules(conf, env, { ...options });
    conf = scopePluginOptions(conf, env, {
      ...options,
      allowedFiles: [path.resolve(process.cwd(), 'README.md'), path.resolve(process.cwd(), 'src')],
    });
    conf = lessModules(conf, env, options);
    // Get the project version.
    conf.plugins!.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version),
      }),
    );
    /**
     * fix failed to parse source map issue
     * https://github.com/kktjs/kkt/issues/446
     */
    conf.ignoreWarnings = [{ module: /node_modules[\\/]parse5[\\/]/ }];
    if (env === 'production') {
      conf.output = { ...conf.output, publicPath: './' };
    }
  }
  // conf = reactLibrary(conf, env, {
  //   ...options,
  //   ...pkg,
  //   name: 'ReactHotkeys',
  //   module: 'src/index.tsx',
  //   main: 'dist/react-hotkeys.js',
  //   // webpack externals options
  //   dependencies: {
  //     react: {
  //       root: 'React',
  //       commonjs2: 'react',
  //       commonjs: 'react',
  //       amd: 'react',
  //     },
  //     'react-dom': {
  //       root: 'ReactDOM',
  //       commonjs2: 'react-dom',
  //       commonjs: 'react-dom',
  //       amd: 'react-dom',
  //     },
  //   },
  // });
  // if (options.bundle) {
  //   conf.plugins!.push(new webpack.BannerPlugin(`react-hotkeys v${pkg.version} \n${pkg.description}\nCopyright (c) ${(new Date()).getFullYear()} ${pkg.author}\nLicensed under the ${pkg.license} license. `))
  // }
  return conf;
};
