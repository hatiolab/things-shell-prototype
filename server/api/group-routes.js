var groups = require('./groups');
var boards = require('./boards');

module.exports = function (app, db) {
  app.post('/groups/:group', (req, res) => {
    groups.create(req.body);

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

  app.get('/groups/:group', (req, res) => {
    let group = groups.get(req.params.group);

    if (group.type == 'play-group') {
      res.send({
        success: true,
        group: group,
        list: (group.plays || []).map(boardName => boards.get(boardName))
      })
    } else {
      res.send({
        success: true,
        group: group,
        list: boards.list().filter(board => board.group == group.name)
      })
    }
  });

  app.get('/groups/:group/boards', (req, res) => {
    let group = groups.get(req.params.group);

    if (group.type == 'play-group') {
      res.send({
        success: true,
        group: group,
        list: (group.plays || []).map(boardName => boards.get(boardName))
      })
    } else {
      res.send({
        success: true,
        group: group,
        list: boards.list().filter(board => board.group == group.name)
      })
    }
  });

  app.post('/groups/:group/boards/:board', (req, res) => {
    let groupName = req.params.group;
    let boardName = req.params.board;

    let group = groups.join(groupName, boardName);

    if (group.type == 'play-group') {
      res.send({
        success: true,
        group: group,
        list: (group.plays || []).map(board => boards.get(board))
      })
    } else {
      res.send({
        success: true,
        group: group,
        list: boards.list().filter(board => board.group == group)
      })
    }
  });
};
