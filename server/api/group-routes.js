var resolve = require('resolve');
var fs = require('mz/fs');
var path = require('path');

module.exports = function (app, db) {
  app.post('/groups', (req, res) => {
    res.send('Hello');
  });

  app.get('/groups', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/groups.json');

    var contents = fs.readFileSync(indexFile);
    var list = JSON.parse(contents);

    var list = Object.keys(list).map(key => {
      return {
        name: key,
        value: list[key]
      }
    });

    res.send(list);
  });

  app.get('/groups/:group/boards', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');

    var contents = fs.readFileSync(indexFile);
    var list = JSON.parse(contents);

    var list = Object.keys(list).map(key => {
      return {
        name: key,
        value: list[key]
      }
    }).filter(model => model.value.group == req.params.group);

    res.send(list);
  })
};
