const boardRoutes = require('./board-routes');
const groupRoutes = require('./group-routes');
const playGroupRoutes = require('./play-group-routes');

module.exports = function (app, db) {
  boardRoutes(app, db);
  groupRoutes(app, db);
  playGroupRoutes(app, db);
};