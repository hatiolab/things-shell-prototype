export const refreshSceneList = list => {
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

export const fetchSceneList = () => async dispatch => {
  try {
    const url = `boards`;
    const response = await fetch(url)
    const responseBody = await response.json();
    dispatch(refreshSceneList(responseBody));
  } catch (error) {
    dispatch(clearSceneList());
  }
}
