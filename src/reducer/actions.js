export const fetchBoardList = (group) => async dispatch => {
  try {
    const url = group ? `groups/${group}/boards` : 'boards';
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch({
      type: 'BOARD-LIST',
      list: responseBody
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-BOARD-LIST'
    });
  }
}

export const saveBoard = (model) => async dispatch => {
  try {
    const url = `boards/${model.name || 'NEW'}`;

    // var data = new FormData();
    // data.append("json", JSON.stringify(model));

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(model)
    });
    const responseBody = await response.json();
    dispatch({
      type: 'REFRESH-BOARD',
      model: responseBody
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
      list: responseBody
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
      list: responseBody
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-PLAY-GROUP-LIST'
    });
  }
}
