var groups = require('./play-groups');
var boards = require('./boards');

module.exports = function (app, db) {
  app.post('/play-groups/:group', (req, res) => {
    groups.create(req.params.group);

    res.send({
      success: true,
      list: groups.list()
    });
  });

  app.get('/play-groups', (req, res) => {
    res.send({
      success: true,
      list: groups.list()
    });
  });

  app.get('/play-groups/:group/boards', (req, res) => {
    let group = req.params.group;

    res.send({
      success: true,
      list: boards.list().filter(board => board.group == group)
    })
  });
};
