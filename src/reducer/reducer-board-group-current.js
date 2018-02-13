export default function (state = {}, action) {

  switch (action.type) {
    case 'CHANGE-GROUP':
      return Object.assign({}, state, {
        name: action.group
      });

    case 'BOARD-LIST':
      return action.group;

    default:
      return state;
  }
}
