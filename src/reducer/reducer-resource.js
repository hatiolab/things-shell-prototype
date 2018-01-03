const STATE = {
  'en': {
    'env-mention': 'v{version} - ENV {env}.'
  },
  'ko': {
    'env-mention': '버전 {version} - {env} 환경'
  },
  'zh': {
    'env-mention': '版{version} - {env}环境'
  }
};

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
