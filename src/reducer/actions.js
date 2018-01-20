export const fetchBoardList = (group) => async dispatch => {
  try {
    const url = group ? `groups/${group}/boards` : 'boards';
    const response = await fetch(url);
    const responseBody = await response.json();
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
    const url = `boards/${board.name || 'NEW'}`;
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
  } catch (error) {
    console.error(error);
    /* TODO error */
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
