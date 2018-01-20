export const createBoard = () => {
  return {
    type: 'BOARD-LIST',
    list
  }
};

export const clearSceneList = () => {
  return {
    type: 'CLEAR-BOARD-LIST'
  }
};

export const fetchBoardList = (group) => async dispatch => {
  try {
    const url = group ? `groups/${group}/boards` : 'boards';
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(refreshSceneList(responseBody));
  } catch (error) {
    dispatch(clearSceneList());
  }
}
