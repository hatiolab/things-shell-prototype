const STATE = []

export default function (state = STATE, action) {
  switch (action.type) {
    case 'BOARD-LIST':
      return action.list;

    case 'CLEAR-BOARD-LIST':
      return [];

    default:
      return state
  }
}
