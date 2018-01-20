var resolve = require('resolve');
var fs = require('mz/fs');
var path = require('path');

module.exports = function (app, db) {
  app.post('/boards/:board', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');
    var contents = fs.readFileSync(indexFile);
    var boards = JSON.parse(contents);
    var board = req.params.board;

    var old = boards[board];
    // if (old) {
    //   // already exist
    //   res.send('fail-duplicated');
    // } else {
    // crete ...
    console.log(req.body);
    boards[board] = req.body;
    fs.writeFileSync(indexFile, JSON.stringify(boards, null, 2), 'utf8');
    res.send({
      success: false,
      board: boards[board]
    });
    // }
  });

  app.put('/boards/:board', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');
    var contents = fs.readFileSync(indexFile);
    var boards = JSON.parse(contents);
    var board = req.params.board;

    var old = boards[board];
    if (!old) {
      // already exist
      res.send('fail-not-exist');
    } else {
      // create ...
      boards[board] = req.body;
      fs.writeFileSync(indexFile, JSON.stringify(boards, null, 2), 'utf8');
      res.send('success');
    }
  });

  app.get('/boards', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');

    var contents = fs.readFileSync(indexFile);
    var list = JSON.parse(contents);

    var list = Object.keys(list).map(key => {
      return {
        name: key,
        value: list[key]
      }
    });

    res.send(list);
  })

  app.get('/boards/:board', (req, res) => {

    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');

    var contents = fs.readFileSync(indexFile);
    var list = JSON.parse(contents);

    console.log('get board', req.params.board, list[req.params.board]);
    res.send({
      success: true,
      board: list[req.params.board]
    });
  })

};
