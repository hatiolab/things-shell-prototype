export default function (state = [], action) {
  switch (action.type) {
    case 'BOARD-LIST':
      return action.list;

    case 'CLEAR-BOARD-LIST':
      return [];

    default:
      return state
  }
}
