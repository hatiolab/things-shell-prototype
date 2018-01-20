var boards = require('./boards');

module.exports = function (app, db) {
  app.post('/boards/:board', (req, res) => {
    try {
      let name = req.params.board;
      boards.create(req.body);

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
      boards.update(req.body);

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
