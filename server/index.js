const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  bodyParser = require('body-parser');

var config = require('../webpack.config.js'),
  compiler = webpack(config);

var DIST_DIR = path.join(__dirname, 'dist'),
  PORT = 3000,
  app = express(),
  router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true }
}));

//Send index.html when the user access the web
router.get('/', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

require('./api')(app, {});

app.use(router);

app.listen(PORT, () => console.log('listening on 3000'));
