var resolve = require('resolve');
var fs = require('mz/fs');
var path = require('path');

var boards = require('./boards');

const boardRootPath = path.resolve(process.cwd(), 'boards');
const playGroupIndexPath = path.resolve(boardRootPath, 'play-groups.json');

var playGroups = {};

function initialize() {

  // 1. 인덱스파일을 로딩한다. 만일, 없다면, 
  try {
    const fileContent = fs.readFileSync(playGroupIndexPath)
    playGroups = JSON.parse(fileContent);
  } catch (err) {
    console.log('Building play-group index file', playGroupIndexPath);

    saveGroup();
  }
}

initialize();

function create(group) {
  var {
    name,
    description
  } = group;

  playGroups[name] = {
    name,
    description
  };

  saveGroup();
}

function update(group) {
  var {
    name,
    description
  } = group;

  playGroups[name] = {
    name,
    description
  };

  saveGroup();
}

function remove(name) {
  delete playGroups[name];
  saveGroup();
}

function list(query) {
  return Object.values(playGroups);
}

function get(name) {
  return playGroups[name];
}

function saveGroup() {
  fs.writeFileSync(playGroupIndexPath, JSON.stringify(playGroups, null, 2), 'utf8');
}

module.exports = {
  get,
  list,
  remove,
  create,
  update,
}