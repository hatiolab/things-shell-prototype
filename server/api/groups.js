var resolve = require('resolve');
var fs = require('mz/fs');
var path = require('path');

var boards = require('./boards');

const boardRootPath = path.resolve(process.cwd(), 'boards');
const boardIndexPath = path.resolve(boardRootPath, 'boards.json');
const groupIndexPath = path.resolve(boardRootPath, 'groups.json');

var groups = {
  'DEFAULT-GROUP': {
    name: 'DEFAULT-GROUP',
    description: 'DESC-DEFAULT-GROUP'
  }
};

function initialize() {

  // 1. 인덱스파일을 로딩한다. 만일, 없다면, ..
  try {
    const fileContent = fs.readFileSync(groupIndexPath)
    groups = JSON.parse(fileContent);
  } catch (err) {
    console.log('Building group index file', groupIndexPath);

    boards.list().forEach(board => {
      let group = board.group;
      if (group && !groups[group]) {
        groups[group] = {
          name: group,
          description: 'DESC-' + group
        }
      }
    })

    saveGroup();
  }
}

initialize();

function create(group) {
  var {
    name,
    description
  } = group;

  groups[name] = {
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

  groups[name] = {
    name,
    description
  };

  saveGroup();
}

function remove(name) {
  delete groups[name];
  saveGroup();
}

function list(query) {
  return Object.values(groups);
}

function get(name) {
  return groups[name];
}

function saveGroup() {
  fs.writeFileSync(groupIndexPath, JSON.stringify(groups, null, 2), 'utf8');
}

module.exports = {
  get,
  list,
  remove,
  create,
  update,
}