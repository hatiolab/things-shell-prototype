const STATE = {
  id: 'heartyoh',
  name: 'heartyoh',
  // locale: 'zh-CN'
  locale: 'ko-KR'
}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'SET-LOCALE':
      return Object.assign({}, state, {
        locale: action.locale
      });

    default:
      return state
  }
}
