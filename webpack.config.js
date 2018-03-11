const {
  resolve,
  join
} = require('path');
const module_resolve = require('resolve');
const NodePackage = require('./package.json');
const webpack = require('webpack');

const WorkboxPlugin = require('workbox-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ElectronPackager = require("webpack-electron-packager");

const outputPath = resolve('dist');

try {
  let path = module_resolve.sync('@hatiolab/things-shell', {
    basedir: process.cwd()
  });
  var thingsShellModulePath = resolve(path, '../..');
  var externModulesPath = resolve(path, '../../../..');

} catch (e) {
  console.log('@hatiolab/things-shell module not found.');
  var thingsShellModulePath = __dirname;
  var externModulesPath = resolve(__dirname, 'node_modules');
}

console.log('ThingsShell Module Path', thingsShellModulePath);
console.log('Extern Module Path', externModulesPath);

module.exports = {
  mode: 'development',
  entry: {
    bundle: [
      resolve(thingsShellModulePath, './src/index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ],
    // 'things-module': './things-module.js'
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env', {
                targets: {
                  browsers: ['last 2 Chrome versions', 'Safari 10']
                },
                debug: true
              }
            ]
          ],
          plugins: []
        }
      }
    }, {
      test: /\.template$/,
      use: ['text-loader']
    }, {
      test: /\.html$/,
      use: [{
        loader: 'babel-loader'
      },
      {
        loader: 'polymer-webpack-loader'
      }
      ]
    }, {
      test: /\.css$/,
      use: ['text-loader']
    }, {
      test: /\.postcss$/,
      use: ['text-loader', 'postcss-loader']
    }, {
      test: /\.(gif|jpe?g|png)$/,
      loader: 'url-loader?limit=25000',
      query: {
        limit: 10000,
        name: '[path][name].[hash:8].[ext]'
      }
    }, {
      test: /\.(obj|mtl|tga|3ds|max|dae)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }, {
      test: /things-scene-components.import$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'things-scene-webpack-loader',
        options: {
          module_path: externModulesPath
        }
      }]
    }, {
      test: /things-scene-components-with-tools.import$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'things-scene-config-webpack-loader',
        options: {
          module_path: externModulesPath
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
    //   from: 'styles/**',
    //   context: thingsShellModulePath + '/src/',
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@polymer/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@npm-polymer/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'node_modules/web-animations-js/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'node_modules/@webcomponents/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'node_modules/three/build/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'node_modules/aframe/dist/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'libs/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'licenses/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'assets/**',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'index.html',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }, {
    //   from: 'manifest.json',
    //   context: thingsShellModulePath,
    //   to: outputPath
    // }]),

    // new ElectronPackager({
    //   dir: ".",
    //   arch: "x64",
    //   packageManager: "yarn",
    //   platform: "darwin",
    // })
  ],
  devtool: 'cheap-module-source-map',
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
