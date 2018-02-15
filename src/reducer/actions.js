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

export const fetchBoardList = (group, route = 'list') => async dispatch => {
  try {
    const url = `groups/${group}`;
    const response = await fetch(url);
    const responseBody = await response.json();

    dispatch(setRoute(route, group));

    dispatch({
      type: 'BOARD-LIST',
      group: responseBody.group,
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

export const createBoard = (board) => async dispatch => {
  try {
    const url = `boards/${board.name}`;

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

export const updateBoard = (board) => async dispatch => {
  try {
    const url = `boards/${board.name}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(board)
    });
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

export const joinGroup = (boardName, group) => async dispatch => {
  try {
    const url = `groups/${group}/boards/${boardName}`;

    const response = await fetch(url, {
      method: 'POST'
    });

    const responseBody = await response.json();

    dispatch(setRoute('list', group));

    dispatch({
      type: 'BOARD-LIST',
      group: responseBody.group,
      list: responseBody.list
    });
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const createGroup = (group) => async dispatch => {
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

/* Route 변경시, 각 Route별로 필요한 state 설정 작업을 수행한다. */
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
      dispatch({
        type: 'CHANGE-GROUP',
        group: id || 'DEFAULT-GROUP'
      });

      if (!id) {
        dispatch(setRoute('player', 'DEFAULT-GROUP'));
        return;
      } else {
        dispatch(fetchBoardList(id, 'player'));
      }
      break;
    case 'viewer':
      dispatch(fetchBoard(id));
      break;
    case 'setting-font':
    case 'setting-datasource':
    case 'setting-publisher':
    case 'setting-security':
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
