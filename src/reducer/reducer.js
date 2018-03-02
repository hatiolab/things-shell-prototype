import * as Redux from 'redux';

import route from './reducer-route';
import boardList from './reducer-board-list';
import boardGroupList from './reducer-board-group-list';
import boardGroupCurrent from './reducer-board-group-current';
import boardCurrent from './reducer-board-current';
import user from './reducer-user';
import resource from './reducer-resource';
import process from './reducer-process';
import component from './reducer-component';
import propertyEditor from './reducer-property-editor';
import drawer from './reducer-drawer';
import style from './reducer-style';

export default Redux.combineReducers({
  route,
  boardList,
  boardCurrent,
  boardGroupList,
  boardGroupCurrent,
  user,
  resource,
  process,
  component,
  propertyEditor,
  drawer,
  style
});
