// import sample from '../../boards/models/sample-001';

// const STATE = {
//   title: 'Things Board 01 (Click to Edit)',
//   model: sample
// };
const STATE = {};
const NEW_MODEL = {
  name: 'NEW (Click to Edit)',
  description: 'DESCRIPTION (Click to Edit)',
  width: 800,
  height: 600,
  model: {
    width: 800,
    height: 600
  }
}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'NEW-SCENE':
      return Object.assign({}, NEW_MODEL);

    case 'CHANGE-SCENE-NAME':
      return Object.assign({}, state, {
        name: action.name
      });

    case 'CHANGE-SCENE-SYNOPSIS':
      return Object.assign({}, state, {
        synopsis: action.synopsis
      });

    case 'REFRESH-SCENE':
      return action.model;

    default:
      return state;
  }
}
