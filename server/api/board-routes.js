var boards = require('./boards');
var groups = require('./groups');

function resolveGroup(groupName) {
  var group = groups.get(groupName);
  if (group && (group.type === 'group'))
    return groupName;
}

module.exports = function (app, db) {
  app.post('/boards/:board', (req, res) => {
    try {
      let name = req.params.board;
      boards.create(name, Object.assign(req.body, {
        group: resolveGroup(req.body.group)
      }));

      res.send({
        success: true,
        board: boards.get(name)
      });
    } catch (e) {
      console.error(e)
      res.send({
        success: false,
        message: e
      });
    }
  });

  app.put('/boards/:board', (req, res) => {
    try {
      let name = req.params.board;
      boards.update(name, Object.assign(req.body, {
        group: resolveGroup(req.body.group)
      }));

      res.send({
        success: true,
        board: boards.get(name)
      });
    } catch (e) {
      console.error(e)
      res.send({
        success: false,
        message: e
      });
    }
  });

  app.get('/boards', (req, res) => {
    try {
      res.send({
        success: true,
        list: boards.list()
      });
    } catch (e) {
      res.send({
        success: false,
        message: e
      });
    }
  })

  app.get('/boards/:board', (req, res) => {
    try {
      res.send({
        success: true,
        board: boards.get(req.params.board)
      });
    } catch (e) {
      res.send({
        success: false,
        message: e
      });
    }
  })
};
