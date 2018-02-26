const boardRoutes = require('./board-routes');
const groupRoutes = require('./group-routes');

module.exports = function (app, db) {
  boardRoutes(app, db);
  groupRoutes(app, db);
};
