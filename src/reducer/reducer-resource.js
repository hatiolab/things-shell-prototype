import {merge} from 'lodash';

import en_US from '../resources/en-US.json';
import ko_KR from '../resources/ko-KR.json';
import zh_CN from '../resources/zh-CN.json';

const STATE = {
  'en-US': {
    'env-mention': 'v{version} - ENV {env}.',
    'keyword': 'keyword'
  },
  'ko-KR': {
    'env-mention': '버전 {version} - {env} 환경',
    'keyword': '키워드'
  },
  'zh-CN': {
    'env-mention': '版{version} - {env}环境',
    'keyword': 'keyword'
  }
};

merge(STATE, en_US, ko_KR, zh_CN);

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
