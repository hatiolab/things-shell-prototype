import merge from 'lodash/merge';

import en_US from '../resources/en-US.json';
import ko_KR from '../resources/ko-KR.json';
import zh_CN from '../resources/zh-CN.json';

const STATE = {
  'en-US': {
    'env-mention': 'v{version} - ENV {env}.',
    'keyword': 'keyword',
    'label.click-to-add-new-board': 'Click to add new board',
    'label.click-to-add-new-group': 'Click to add new group',
    'label.pls-name-group': 'Please, give a name for the new group.',
    'label.pls-name-board': 'Please, give a name for the new board.',
    'label.new-group': 'New Group'
  },
  'ko-KR': {
    'env-mention': '버전 {version} - {env} 환경',
    'keyword': '키워드',
    'label.click-to-add-new-board': '새로운 보드를 만드려면 클릭하세요.',
    'label.click-to-add-new-group': '새로운 그룹을 만드려면 클릭하세요.',
    'label.pls-name-group': '새로 만들 그룹의 이름을 지어주세요',
    'label.pls-name-board': '새로 만들어진 보드입니다. 보드의 이름을 지어주세요.',
    'label.new-group': '새 그룹'
  },
  'zh-CN': {
    'env-mention': '版{version} - {env}环境',
    'keyword': 'keyword',
    'label.click-to-add-new-board': 'Click to add new board',
    'label.click-to-add-new-group': 'Click to add new group',
    'label.pls-name-group': 'Please, give a name for the new group.',
    'label.pls-name-board': 'Please, give a name for the new board.',
    'label.new-group': 'New Group'
  }
};

merge(STATE, en_US, ko_KR, zh_CN);

import elements from '../things-scene-components-with-tools.import';

for (let element in elements) {
  merge(STATE, elements[element].locales);
}

export default function (state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
