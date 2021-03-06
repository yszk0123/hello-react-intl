const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? undefined : 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: './src/assets/index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
      openAnalyzer: false,
    }),
    isProduction && new UglifyJSWebpackPlugin(),
  ].filter(Boolean),
  stats: {
    children: false,
  },
};
