import sample from '../../samples/sample-001';

const STATE = {
  title: 'Things Board 01 (Click to Edit)',
  model: sample
};

export default function (state = STATE, action) {
  switch (action.type) {
    case 'CHANGE-SCENE-TITLE':
      return Object.assign({}, state, {
        title: action.title
      });

    case 'CHANGE-SCENE-SYNOPSIS':
      return Object.assign({}, state, {
        synopsis: action.synopsis
      });

    default:
      return state
  }
}
