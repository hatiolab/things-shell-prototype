const { resolve, join } = require('path');
const module_resolve = require('resolve');
const NodePackage = require('./package.json');
const webpack = require('webpack');

const WorkboxPlugin = require('workbox-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// const ElectronPackager = require("webpack-electron-packager");

var outputPath = resolve('dist');

try {
  let path = module_resolve.sync('@hatiolab/things-shell', { basedir: process.cwd() });
  var thingsShellModulePath = resolve(path, '..');
  var externModulesPath = resolve(path, '../../..');

} catch (e) {
  console.log('@hatiolab/things-shell module not found.');
  var thingsShellModulePath = __dirname;
  var externModulesPath = resolve(__dirname, 'node_modules');
}

console.log('ThingsShell Module Path', thingsShellModulePath);
console.log('Extern Module Path', externModulesPath);

module.exports = {
  entry: {
    bundle: [
      resolve(thingsShellModulePath, './src/index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  resolve: {
    modules: [
      externModulesPath
    ]
  },
  resolveLoader: {
    modules: [
      externModulesPath,
      resolve(thingsShellModulePath, "web_loaders")
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [[
            'env', {
              targets: {
                browsers: ['last 2 Chrome versions', 'Safari 10']
              },
              debug: true
            }
          ]],
          plugins: [
          ]
        }
      }
    }, {
      test: /\.template$/,
      use: ['text-loader']
    }, {
      test: /\.html$/,
      use: [
        { loader: 'babel-loader' },
        { loader: 'polymer-webpack-loader' }
      ]
    }, {
      test: /\.css$/,
      use: ['text-loader']
    }, {
      test: /\.postcss$/,
      use: ['text-loader', 'postcss-loader']
    }, {
      test: /\.json$/,
      use: ['json-loader']
    }, {
      test: /things-scene-components.import$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'things-scene-webpack-loader',
        options: {
          excludes: [
            '@things-elements/things-scene-chartjs'
          ]
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE-ENV': JSON.stringify(
          process.argv.find(arg => arg.includes('webpack-dev-server')) ? 'development' : 'production'
        ),
        'APP-VERSION': JSON.stringify(NodePackage.version)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),

    // new ExtractTextPlugin('./bundle.css'),
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.
    // new HtmlWebpackPlugin({
    //   template: resolve(__dirname, 'src/index.ejs')
    // }),
    // This plugin will copy files over to ‘./dist’ without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015. We’ll talk about this a bit later :)
    // new CopyWebpackPlugin([{
    //   from: resolve(__dirname, '@webcomponents/webcomponentsjs/*.js'),
    //   to: '/webcomponentsjs/[name].[ext]'
    // }, {
    //   from: 'styles/**',
    //   context: resolve('./src'),
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@polymer/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@npm-polymer/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'node_modules/web-animations-js/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@webcomponents/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'libs/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'licenses/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'assets/**',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    //   from: 'index.html',
    //   context: resolve('.'),
    //   to: outputPath
    // }, {
    // from: 'manifest.json',
    // context: resolve('.'),
    // to: outputPath
    // }]),
    // new ElectronPackager({
    //   dir: ".",
    //   arch: "x64",
    //   packageManager: "yarn",
    //   platform: "darwin",
    // })
  ],
  // devtool: 'cheap-module-source-map',
  // devServer: {
  //   contentBase: resolve('.'),
  //   compress: true,
  //   overlay: {
  //     errors: true
  //   },
  //   port: 3000,
  //   host: '0.0.0.0',
  //   disableHostCheck: true
  // }
}
