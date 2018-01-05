const {resolve, join} = require('path');
const NodePackage = require('./package.json');
const webpack = require('webpack');

const WorkboxPlugin = require('workbox-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outputPath = resolve('dist');

module.exports = {
  devServer: {
    contentBase: resolve('.')
  //   compress: true,
  //   overlay: {
  //     errors: true
  //   },
  //   port: 3000,
  //   host: '0.0.0.0',
  //   disableHostCheck: true
  }
}
