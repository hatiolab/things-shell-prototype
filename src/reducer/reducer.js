import * as Redux from 'redux';

import route from './reducer-route';
import sceneList from './reducer-scene-list';
import sceneGroupList from './reducer-scene-group-list';
import sceneCurrent from './reducer-scene-current';
import user from './reducer-user';
import message from './reducer-message';
import process from './reducer-process';
import component from './reducer-component';

export default Redux.combineReducers({
  route,
  sceneList,
  sceneCurrent,
  sceneGroupList,
  user,
  message,
  process,
  component
})
