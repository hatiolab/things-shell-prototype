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
    res.send('success');
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
      // crete ...
      boards[board] = req.body;
      fs.writeFileSync(indexFile, JSON.stringify(boards, null, 2), 'utf8');
      res.send('success');
    }
  });

  app.get('/boards/:group', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');

    var contents = fs.readFileSync(indexFile);
    var jsonContent = JSON.parse(contents);

    var list = Object.keys(jsonContent).map(key => {
      return {
        name: key,
        value: jsonContent[key]
      }
    }).filter(model => model.value.group == req.params.group);

    res.send(list);
  })

  app.get('/boards/:board', (req, res) => {
    var indexFile = path.resolve(process.cwd(), 'boards/boards.json');

    var contents = fs.readFileSync(indexFile);
    var list = JSON.parse(contents);

    res.send(list[req.params.board]);
  })

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
};

/*
if (!this.scene)
return

var self = this

try {
this.scene.toDataURL('png', null, 400, 300)
.then(function(url) {
  self._sendSaveRequest(url)
}, function(err) {
  console.error(err)

  self._sendSaveRequest('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==')
})
} catch (e) {
if (this.showToastMsg) this.showToastMsg(e);
}

_sendSaveRequest: function (thumbnail) {
  var model = this.scene.model

  delete model.translate
  delete model.scale
  if (!model.width)
    model.width = 1200
  if (!model.height)
    model.height = 800

  this.request = {
    name: this.board.name,
    description: this.board.description,
    width: model.width,
    height: model.height,
    group_id: this.board.group,
    model: this.scene.serialize(),
    tags: this.board.tags,
    lat: 37.389222,
    lng: 127.0897292,
    thumbnail: thumbnail
  }

  this.$['save-scene'].generateRequest()
},

<things-ajax id="save-scene" method="PUT" content-type="application/json" resource-url="scenes/{{saveUrl}}" body="{{request}}">
</things-ajax>
*/
