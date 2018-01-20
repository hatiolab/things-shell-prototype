const STATE = {
  rootPath: '',
  route: 'list'
};

function set(state, o) {
  return Object.assign({}, state, o)
}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'INIT-ROUTE':
      return set(state, {
        rootPattern: (new URL(action.path)).pathname
      });
    case 'CHANGE-ROUTE':
      let routeData = action.routeData;
      return set(state, {
        route: routeData.page || 'list'
      });
    case 'SET-ROUTE':
      return set(state, {
        route: action.route
      });
    case 'SHOW-BOARD-INFO':
      return set(state, {
        route: 'info'
      });
    case 'SHOW-BOARD-MODELER':
      return set(state, {
        route: 'modeler'
      });
    case 'SHOW-BOARD-LIST':
      return set(state, {
        route: 'list'
      });
    default:
      return state
  }
}
