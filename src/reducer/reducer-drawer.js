/**
 * Drawer가 open 되어야 하는 지 close 되어야 하는 지를 지시하는 상태임.
 */

const STATE = {
  collapsed: false
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
    case 'CLOSE-DRAWER':
      return set(state, {
        collapsed: true
      });
    case 'OPEN-DRAWER':
      return set(state, {
        collapsed: false
      });
    default:
      return state
  }
}
