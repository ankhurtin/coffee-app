const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const PORT = 8080;

function getPath(...pathParts) {
  return path.resolve(__dirname, ...pathParts);
}
module.exports = (env) => {
  const isDev = !!(env && env.development);

  console.log('development mode: ', isDev);
  console.log('port: ', PORT);

  return {
    entry: {
      app: getPath('src', 'main.ts')
    },

    output: {
      path: getPath('public', 'build'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: isDev ? '[name].js' : '[name].[contenthash].js'
    },

    optimization: {
      minimize: !isDev,
      minimizer: ['...', new CssMinimizerPlugin()],
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        name: (module, chunks, cacheGroupKey) => {
          const allChunksNames = chunks.map((chunk) => chunk.name).join('_');
          const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
          return `${prefix}_${allChunksNames}`;
        },
      },
      runtimeChunk: { name: 'runtime' }
    },

    resolve: {
      alias: {
        svelte: path.resolve('node_modules', 'svelte/src/runtime'),
        src: getPath('src')
      },
      extensions: ['.ts', '.mjs', '.js', '.css', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      conditionNames: ['svelte', 'browser', 'import'],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: isDev,
            context: getPath(),
            configFile: getPath('tsconfig.json')
          }
        },
        {
          test: /\.svelte$/,
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: isDev
            },

            emitCss: true,
            hotReload: isDev,
            preprocess: require('svelte-preprocess')({})
          }
        },
        {
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css$/,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ]
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ]
        },
      ]
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({ typescript: { configFile: getPath('tsconfig.json') } }),
      new HtmlWebpackPlugin({ template: getPath('src', 'index.html'), favicon:  getPath('favicon.png') }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev ? '[name].css' : '[name].[contenthash].css'
      })
    ],

    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : false,
    devServer: {
      hot: true,
      compress: true,
      port: PORT,
    }
  };
};
