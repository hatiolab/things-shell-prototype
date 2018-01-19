export const createBoard = () => {
  return {
    type: 'SCENE-LIST',
    list
  }
};

export const clearSceneList = () => {
  return {
    type: 'CLEAR-SCENE-LIST'
  }
};

export const fetchSceneList = (group) => async dispatch => {
  try {
    const url = group ? `groups/${group}/boards` : 'boards';
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(refreshSceneList(responseBody));
  } catch (error) {
    dispatch(clearSceneList());
  }
}
