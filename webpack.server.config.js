var path = require("path");
var webpack = require("webpack");

var DIST_DIR = path.join(__dirname, "dist"),
  CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
  context: CLIENT_DIR,

  entry: {
    client: [
      './main.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },

  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
