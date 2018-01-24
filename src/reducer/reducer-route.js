function set(state, o) {
  return Object.assign({}, state, o)
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'INIT-ROUTE':
      return set(state, {
        rootPattern: (new URL(action.path)).pathname
      });
    case 'CHANGE-ROUTE':
      let route = action.route;
      return set(state, {
        page: route.page || 'list',
        id: route.id
      });
    case 'SET-ROUTE':
      return set(state, {
        page: action.route
      });
    case 'SHOW-BOARD-INFO':
      return set(state, {
        page: 'info'
      });
    case 'SHOW-BOARD-MODELER':
      return set(state, {
        page: 'modeler'
      });
    case 'SHOW-BOARD-LIST':
      return set(state, {
        page: 'list'
      });
    case 'CHANGE-LOCATION':
      let location = action.location;
      return set(state, {
        path: `${location.page}/${location.id}`
      })
    default:
      return state
  }
}
