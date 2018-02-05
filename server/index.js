const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  bodyParser = require('body-parser'),
  graphqlApi = require('./graphql-api');

var config = require('../webpack.config.js'),
  compiler = webpack(config);

var DIST_DIR = config.output.path,
  PORT = 3000,
  app = express(),
  router = express.Router(),
  currentApp = app;

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

graphqlApi(app);

const ROOT_DIR = path.join(__dirname, '..');

//Send index.html when the user access the web
router.get('/', function (req, res) {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

router.get('/:page', function (req, res) {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

router.get('/:page/:id', function (req, res) {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

//Serving the files on the root folder
app.use(express.static(ROOT_DIR));

require('./api')(app, {});

app.use(router);

app.listen(PORT, () => console.log('listening on 3000'));
