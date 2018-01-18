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
    var jsonContent = JSON.parse(contents);

    res.send(jsonContent);
  })
};