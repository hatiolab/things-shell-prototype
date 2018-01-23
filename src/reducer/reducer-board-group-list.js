export default function (state = [], action) {
  switch (action.type) {
    case 'GROUP-LIST':
      return action.list;

    case 'CLEAR-GROUP-LIST':
      return [];

    default:
      return state
  }
}
