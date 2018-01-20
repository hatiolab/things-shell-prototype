const STATE = {
  id: 'heartyoh',
  name: 'heartyoh',
  language: 'zh-CN'
}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'SET-LOCALE':
      return Object.assign({}, state, {
        language: action.locale
      });

    default:
      return state
  }
}
