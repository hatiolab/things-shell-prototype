var groups = require('./groups');
var boards = require('./boards');

module.exports = function (app, db) {
  app.post('/groups/:group', (req, res) => {
    groups.create(req.params.group);

    res.send({
      success: true,
      list: groups.list()
    });
  });

  app.get('/groups', (req, res) => {
    res.send({
      success: true,
      list: groups.list()
    });
  });

  app.get('/groups/:group/boards', (req, res) => {
    let group = req.params.group;

    res.send({
      success: true,
      list: boards.list().filter(board => board.group == group)
    })
  });
};
