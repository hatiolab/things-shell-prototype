const STATE = {
  collapsed: true
};

function set(state, o) {
  return Object.assign({}, state, o)
}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'TOGGLE-DRAWER':
      return set(state, {
        collapsed: !state.collapsed
      });
    default:
      return state
  }
}
