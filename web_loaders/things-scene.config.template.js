/**
 * Modeller를 위한 메타 정보
 *
 * 1. 컴포넌트 임포트
 *  - entry point를 통한 기회만 제공한다.
 * 2. 컴포넌트 템플릿 리스트
 *  - 모델러에 포함될 컴포넌트 템플릿 리스트 (실제로는 하나의 컴포넌트이지만, 여러 개의 컴포넌트 템플릿에서 사용될 수 있다.)
 *  - 각 컴포넌트는 다음 정보를 가져야 한다.
 *    # 샘플 모델 (컴포넌트를 통해 만들어지는 컴포넌트 기준 모델)
 *    # 그룹 정보 (어떤 종류의 컴포넌트이다. 표준 그룹정보를 참조) : 기본도형, 게이지차트, 테이블, 텍스트/이미지, 커스텀, 3D오브젝트, ...
 *    # 컴포넌트 아이콘 정보
 * 3. 컴포넌트 속성 에디터
 *  - 특별한 에디터를 사용해야 하는 경우, 등록해야 한다.
 *  - 구조적으로 포함할 방법을 모델러에서 제공해야한다.
 *  - 속성 타입 정의, 에디터 구현 매핑
 * 4. 다국어 정보
 * 5. 아이콘 리소스
 *
 * 이 메타정보는 어떻게 관리되나 ?
 * 1. package.json 에 things-scene 속성을 정의
 *  - 값 : true | config file path(default : things-scene.config.js)
 * 2. things-scene.config.js 파일에 메타정보를 정의하도록 함
 *
 * 컴포넌트 구현과 메타정보를 임포트하는 방법
 * 1. things-scene-component.import 는 컴포넌트 구현만 임포트한다.
 * 2. things-scene-component-with-tools.import 는 모델링을 위한 메타정보를 임포트한다.
 */

import icon from '../assets/icon.png';
import AbcEditor from './abc-editor';
import locales from './locales';

var templates = [{
  type: 'Round Button', /* 다국어 키 표현을 어떻게.. */
  description: '...', /* 다국어 키 표현을 어떻게.. */
  group: 'shape', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  template: {
    type: 'button',
    width: 100,
    height: 100,
    text: 'SAMPLE-BUTTON',
    fillStyle: 'lightgray'
  }
}];

var editors = [{
  type: 'abc',
  element: AbcEditor.is
}];

module.exports = {
  templates,
  editors,
  locales
};
