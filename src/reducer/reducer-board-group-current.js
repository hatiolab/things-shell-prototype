export default function (state = '', action) {

  switch (action.type) {
    case 'CHANGE-GROUP':
      return action.group;

    default:
      return state;
  }
}
