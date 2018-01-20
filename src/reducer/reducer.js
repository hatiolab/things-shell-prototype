import * as Redux from 'redux';

import route from './reducer-route';
import boardList from './reducer-board-list';
import boardGroupList from './reducer-board-group-list';
import boardCurrent from './reducer-board-current';
import user from './reducer-user';
import resource from './reducer-resource';
import process from './reducer-process';
import component from './reducer-component';
import drawer from './reducer-drawer';

export default Redux.combineReducers({
  route,
  boardList,
  boardCurrent,
  boardGroupList,
  user,
  resource,
  process,
  component,
  drawer
})
