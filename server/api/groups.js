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
    description: '',
    type: 'group'
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
          description: 'DESC-' + group,
          type: 'group'
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
    description,
    type
  } = group;

  if (groups[name]) {
    throw Error(`group '${name}' already exist.`);
  }

  groups[name] = {
    name,
    description,
    type
  };

  saveGroup();
}

function update(group) {
  var {
    name,
    description
  } = group;

  if (!groups[name]) {
    throw Error(`group '${name}' not exist.`);
  }

  /* description 만 바꿀 수 있다. */
  groups[name][description] = description;

  saveGroup();
}

function remove(name) {
  /**
   * TODO
   * - group type 인 경우 : 그룹에 속하는 보드가 하나도 없어야 삭제가 가능하다.
   * - play-group type 인 경우 : 언제든지 삭제가 가능하다.
   */
  delete groups[name];
  saveGroup();
}

function list(query) {
  return Object.values(groups);
}

function get(name) {
  return groups[name];
}

/**
 *  join into the group.
 *  group 타입이 play-group이면 그룹 리스트에 추가됨.
 *  group 타입이 group이면 그룹 정보가 수정됨(이동).
 */
function join(groupName, boardName) {
  var group = get(groupName);
  if (!group) {
    throw Error(`group '${groupName}' not exist.`);
  }

  var board = boards.get(boardName);
  if (!board) {
    throw Error(`board '${boardName}' not exist.`);
  }

  var type = group.type;
  if (type == 'play-group') {
    group.plays = group.plays || [];
    if (group.plays.indexOf(boardName) == -1)
      group.plays.push(boardName);
  } else {
    board.group = groupName;
  }

  saveGroup();

  return group;
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
  join
}
