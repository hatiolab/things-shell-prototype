import cloneDeep from 'lodash/cloneDeep';

const STATE = {};
const NEW_MODEL = {
  name: '',
  description: '',
  width: 1920,
  height: 1080,
  model: {
    width: 1920,
    height: 1080
  }
};

export default function (state = STATE, action) {
  switch (action.type) {
    case 'CLEAR-BOARD':
      return null;

    case 'NEW-BOARD':
      return cloneDeep(NEW_MODEL);

    case 'CHANGE-BOARD-NAME':
      return Object.assign({}, state, {
        name: action.name
      });

    case 'CHANGE-BOARD-SYNOPSIS':
      return Object.assign({}, state, {
        synopsis: action.synopsis
      });

    case 'REFRESH-BOARD':
      return action.board || cloneDeep(NEW_MODEL);

    default:
      return state;
  }
}
