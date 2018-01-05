const STATE = {
  'en': {
    'env-mention': 'v{version} - ENV {env}.',
    'keyword': 'keyword'
  },
  'ko': {
    'env-mention': '버전 {version} - {env} 환경',
    'keyword': '키워드'
  },
  'zh': {
    'env-mention': '版{version} - {env}环境',
    'keyword': 'keyword'
  }
};

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
