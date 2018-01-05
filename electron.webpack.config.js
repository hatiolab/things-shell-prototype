const {resolve, join} = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: resolve('.'),
    compress: true
  //   overlay: {
  //     errors: true
  //   },
  //   port: 3000,
  //   host: '0.0.0.0',
  //   disableHostCheck: true
  }
}
