var resolve = require('resolve');
var fs = require('mz/fs');
var path = require('path');

const boardRootPath = path.resolve(process.cwd(), 'boards');
const boardFolderPath = path.resolve(boardRootPath, 'models');
const boardIndexPath = path.resolve(boardRootPath, 'boards.json');

const THUMBNAIL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const MODEL = {
  width: 1600,
  height: 1200
};
const GROUP = 'DEFAULT-GROUP';

var boards = {};

function initialize() {

  // 1. 보드 루트 폴더가 있는 지 확인한다. 만일, 없다면, 만든다.
  try {
    fs.mkdirSync(boardRootPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  // 2. 보드 모델 폴더가 있는 지 확인한다. 만일, 없다면, 만든다.
  try {
    fs.mkdirSync(boardFolderPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  // 3. 인덱스파일을 로딩한다. 만일, 없다면, 보드 모델 폴더를 스캔한다.
  try {
    const fileContent = fs.readFileSync(boardIndexPath)
    boards = JSON.parse(fileContent);
  } catch (err) {
    console.log('Building board index file', boardIndexPath);

    // 3-1. 보드 모델폴더를 스캔하면서, 모든 모델을 디폴트 그룹에 넣는다.
    try {
      boards = fs.readdirSync(boardFolderPath)
        .filter(file => file.endsWith('.json') && fs.statSync(file).isFile())
        .map(file => {
          try {
            const stat = fs.statSync(file);
            const model = JSON.parse(fs.readFileSync(boardIndexPath));
            if (!model)
              return null;

            const name = path.basename(file);

            return {
              name: name.substring(0, name.length - 5),
              width: model.width || 600,
              height: model.height || 800,
              path: path.basename,
              updatedAt: stat.mtime,
              createdAt: stat.ctime,
              thumbnail: THUMBNAIL
            }
          } catch (e) {
            return;
          }
        })
        .filter(board => !!board)
        .reduce((sum, board) => {
          sum[board.name] = board;
        }, {})

      saveBoardIndex();
    } catch (err) {
      console.error(err);
    }
  }
}

initialize();

function create(boardName, board) {
  var {
    name,
    description,
    thumbnail = THUMBNAIL,
    group
  } = board;

  if (boards[boardName]) {
    throw Error(`board '${boardName} already exist.`);
  }

  var model = board.model;
  /**
   * TODO 그룹의 존재여부가 확인되어야 한다.
   * 그룹이 없는 경우나 지정 그룹이 플레이 그룹인 경우에는 default group으로 설정된다.
   * 플레이그룹인 경우에는 default group으로 설정 이후 play-group에도 자동으로 추가된다.
   */

  boards[name] = {
    name,
    description,
    width: model.width,
    height: model.height,
    updatedAt: Date.now(),
    createdAt: Date.now(),
    group: group ? group.name : GROUP,
    thumbnail
  };

  saveModel(name, model);
}

function update(boardName, board) {

  var old = boards[boardName];

  if (!old) {
    throw Error(`board '${boardName} not exist.`);
  }

  var {
    name,
    description,
    createdAt = Date.now(),
    thumbnail = THUMBNAIL,
    group = GROUP,
    model = get(name).model
  } = Object.assign({}, old, board);

  boards[boardName] = {
    name,
    description,
    width: model.width,
    height: model.height,
    updatedAt: Date.now(),
    createdAt,
    group,
    thumbnail
  };

  saveModel(boardName, model);
}

function remove(board) {

}

function list(query) {
  return Object.values(boards);
}

function get(name) {

  const modelPath = path.resolve(boardFolderPath, name + '.json');
  var contents = fs.readFileSync(modelPath);

  return Object.assign({}, boards[name], {
    model: JSON.parse(contents)
  });
}

function saveBoardIndex() {
  fs.writeFileSync(boardIndexPath, JSON.stringify(boards, null, 2), 'utf8');
}

/* upsert */
function saveModel(name, model) {

  // 1. 모델 정보가 이미 있는 지 확인한다.
  // 2. 없으면, 파일을 새로 생성한다.
  // 3. 모델 정보를 수정한 후, 저장한다.

  const modelPath = path.resolve(boardFolderPath, name + '.json');
  fs.writeFileSync(modelPath, JSON.stringify(model || MODEL, null, 2), 'utf8');

  saveBoardIndex();
}

module.exports = {
  get,
  list,
  remove,
  create,
  update,
}
