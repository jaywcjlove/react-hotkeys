import path from 'path';
import webpack, { Configuration } from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import reactLibrary from '@kkt/react-library';
import pkg from './package.json';

export default (conf: Configuration, env: 'development' | 'production', options: LoaderConfOptions) => {
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
  conf = reactLibrary(conf, env, {
    ...options,
    ...pkg,
    name: 'ReactHotkeys',
    module: 'src/index.tsx',
    main: 'dist/react-hotkeys.js',
    // webpack externals options
    dependencies: {
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
    },
  });
  if (options.bundle) {
    conf.plugins!.push(new webpack.BannerPlugin(`react-hotkeys v${pkg.version} \n${pkg.description}\nCopyright (c) ${(new Date()).getFullYear()} ${pkg.author}\nLicensed under the ${pkg.license} license. `))
  }
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
};
