const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

/**
 * This file creates a configuration object for webpack.
 * `env` determines which build to make, which is either "client" or "ssr".
 * Development mode is determined from the WEBPACK_DEV_SERVER env variable.
 */

module.exports = () => {
  let config = {
    mode: 'production',
    entry: {
      main: [__dirname + '/src/main.tsx'],
    },
    devtool: 'source-map',
    output: {
      path: __dirname + '/docs/dist',
      filename: '[name].min.js',
      publicPath: '', // See __webpack_public_path__ in src/main.tsx
    },
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src'),
      },
      fallback: {
        // webpack polyfills
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: __dirname + '/tsconfig.json',
          },
        },
        {
          test: /\.(png|jpg|svg)$/,
          loader: 'file-loader',
          options: { emitFile: true },
        },
      ],
    },
  };

  if (process.env.WEBPACK_DEV_SERVER) {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
    config.output.publicPath = 'http://localhost:8080/dist/';
    config = {
      ...config,
      mode: 'development',
      devtool: 'source-map',
      devServer: {
        contentBase: './docs',
        port: process.env.PORT,
        disableHostCheck: true,
        publicPath: '/dist',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
          index: 'index.html',
        },
      },
    };
    config.plugins = [new ForkTsCheckerWebpackPlugin()];
    config.module.rules[0].options.transpileOnly = true;
  }

  return config;
};
