const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Ensure the current working directory is correct
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: "production",
  entry: {
    app: ["regenerator-runtime/runtime.js", "./src/index.js"],
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: resolveApp('dist'),
    filename: 'bundle.js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devServer: {
    contentBase: resolveApp('public'),
    host: '0.0.0.0',
    compress: true,
    port: 8005,
    historyApiFallback: true,
    quiet: true
  },
  externals: {
    config: JSON.stringify({
      apiUrl: '',
      imageapiUrl: '',
      publicPath : '/'            
    })
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
    modules: [
      path.join(__dirname, "js/helpers"),
      "node_modules"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'static/js/vendor',
          chunks: 'all',
        },
      },
      chunks: 'all',
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: './public/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["css/*.*", "js/*.*", "fonts/*.*", "images/*.*"]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new Dotenv({
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
    })
  ]
};
