export const fetchSettings = (query) => async dispatch => {
  try {

    const url = `settings`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ query })
    });
    const responseBody = await response.json();

    console.log('/settings response', responseBody);
    // dispatch({
    //   type: 'REFRESH-SETTINGS',
    //   list: responseBody.list
    // });

  } catch (error) {

    console.error(error);
    // dispatch({
    //   type: 'CLEAR-BOARD-LIST'
    // });
  }
}

export const fetchBoardList = (group) => async dispatch => {
  try {
    const url = `groups/${group}/boards`;
    const response = await fetch(url);
    const responseBody = await response.json();

    dispatch(setRoute('list', group));

    dispatch({
      type: 'BOARD-LIST',
      list: responseBody.list
    });

  } catch (error) {

    dispatch({
      type: 'CLEAR-BOARD-LIST'
    });
  }
}

export const fetchBoard = (board) => async dispatch => {
  try {
    const url = `boards/${board}`;
    const response = await fetch(url);
    const responseBody = await response.json();

    dispatch({
      type: 'REFRESH-BOARD',
      board: responseBody.board
    });

  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const saveBoard = (board) => async dispatch => {
  try {
    const url = `boards/${board.name}`;
    // var data = new FormData();
    // data.append("json", JSON.stringify(board));

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(board)
    });
    const responseBody = await response.json();
    dispatch({
      type: 'REFRESH-BOARD',
      board: responseBody.board
    });

    dispatch(setRoute('modeler', board.name));
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const newGroup = (group) => async dispatch => {
  try {
    const url = `groups/${group.name}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(group)
    });
    const responseBody = await response.json();

    dispatch(fetchGroupList());
    dispatch(fetchBoardList(group.name));
  } catch (error) {
    console.error(error);
  }
}

export const fetchGroupList = () => async dispatch => {
  try {
    const url = `groups`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch({
      type: 'GROUP-LIST',
      list: responseBody.list
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-GROUP-LIST'
    });
  }
}

export const fetchPlayGroupList = () => async dispatch => {
  try {
    const url = `play-groups`;
    const response = await fetch(url)
    const responseBody = await response.json();
    dispatch({
      type: 'PLAY-GROUP-LIST',
      list: responseBody.list
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-PLAY-GROUP-LIST'
    });
  }
}

export const followRouteChange = (page, id) => dispatch => {

  switch (page) {
    case 'list':
      dispatch({
        type: 'CHANGE-GROUP',
        group: id || 'DEFAULT-GROUP'
      });

      if (!id) {
        dispatch(setRoute('list', 'DEFAULT-GROUP'));
        return;
      } else {
        dispatch(fetchBoardList(id));
      }

      break;
    case 'modeler':
      dispatch(fetchBoard(id));
      break;
    case 'player':
      break;
    case 'viewer':
      dispatch(fetchBoard(id));
      break;
    default:
      if (!id) {
        dispatch(setRoute('list', 'DEFAULT-GROUP'));
      }
      return;
  }

  dispatch({
    type: 'SET-PAGE-AND-ID',
    route: { page, id }
  })
}

export const setRoute = (page, id) => dispatch => {

  dispatch({
    type: 'SET-ROUTE-PATH',
    route: { page, id }
  })
}