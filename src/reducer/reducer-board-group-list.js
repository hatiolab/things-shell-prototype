export default function (state = [], action) {
  switch (action.type) {
    case 'GROUP-LIST':
      return action.list.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type == 'group' ? -1 : 1;
        }
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });

    case 'CLEAR-GROUP-LIST':
      return [];

    default:
      return state
  }
}
