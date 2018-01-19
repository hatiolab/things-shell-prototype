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

export const refreshScene = (model) => {
  return {
    type: 'REFRESH-SCENE',
    model: model
  }
}

export const saveScene = (model) => async dispatch => {
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
    dispatch(refreshScene(responseBody));
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const refreshGroupList = list => {
  return {
    type: 'GROUP-LIST',
    list
  }
};

export const clearGroupList = () => {
  return {
    type: 'CLEAR-GROUP-LIST'
  }
};

export const fetchGroupList = () => async dispatch => {
  try {
    const url = `groups`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch(refreshGroupList(responseBody));
  } catch (error) {
    dispatch(clearGroupList());
  }
}


export const refreshPlayGroupList = list => {
  return {
    type: 'PLAY-GROUP-LIST',
    list
  }
};

export const clearPlayGroupList = () => {
  return {
    type: 'CLEAR-PLAY-GROUP-LIST'
  }
};

export const fetchPlayGroupList = () => async dispatch => {
  try {
    const url = `play-groups`;
    const response = await fetch(url)
    const responseBody = await response.json();
    dispatch(refreshPlayGroupList(responseBody));
  } catch (error) {
    dispatch(clearPlayGroupList());
  }
}
