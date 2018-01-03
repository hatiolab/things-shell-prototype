# things-shell

## [ Application 구조 ]
### app-layout 적용 등 (deprecated 컴포넌트들 제거)
* paper-drawer-panel
* paper-menu
* iron-flex-layout
### app-route 적용
### *redux 패턴 적용*
* polymer-redux 적용
* src/reducer 폴더의 컴포넌트들을 참조
### i18n (미진행)
* 모듈별 i18n 정의 기능을 지원하기 위함임.
* app-localize-behavior 적용 예정임.
### webfont (미진행)
* 서버리스 구성을 위한 방안 필요함.
* 웹폰트 기능을 Model에 추가하는 방안.
* things-resource-combo 제거.
### lit-html template (미진행)
* 내부에서 HTML 템플릿을 동적으로 만드는 경우에 적용.
* 향후 Polymer 3 내부에서 광범위하게 사용될 것으로 예상되므로, 미리 익숙해지기 위함임.
### 폴더 구조
* src : 소스폴더
* libs : import 할 수 없는(모듈화 지원하지 않는) javascript 라이브러리들을 배치함 (예를 들어 dataludi는 모듈을 지원하지 않으므로 libs에 별도로 배치한다.)
* licenses : 필요한 라이선스 파일을 배치함
### 소스(src) 폴더 구조
* components : 어플리케이션 종속성이 없는 독립 컴포넌트들을 배치함 (Redux Pattern을 사용하지 않아야 함.)
* commons : 어플리케이션 내부 여러곳에서 재활용되는 컴포넌트들과 유틸리티 컴포넌트들을 배치함
* app-shell : 어플리케이션 Shell 을 배치함
* layouts : 최상위 레이아웃에서 독립적으로 사용될 구성들을 배치함 (drawer, sidebar 등)
* pages : 라우팅에 연결될 페이지들을 배치함
* reducer : Redux 패턴을 위한 Mixin과 reducer들을 배치함
* assets : 각종 이미지, 아이콘, 그 밖의 manifest 관련 리소스
* styles : 전체 어플리케이션의 공유 스타일과 테마 스타일을 배치함
** shard-styles : 어플라케이션 종속성이 없는 독립 컴포넌트들을 제외하고, 대부분의 컴포넌트에서 shadow dom 렌더링을 위해 include 함.
** things-shell-theme : custom-style 로 각 컴포넌트에서 정의한 스타일 변수를 설정하는 파일임.
## [ Polymer 3 ]
### bower => npm
* npm group 생성
 * @hatiolab
  * @hatiolab/things-scene
  * things-scene-core 불필요
 * @things-elements
  * @things-elements/things-scene-table
  * @things-elements/things-scene-chartjs
  * @things-elements/things-scene-form
  * @things-elements/things-scene-gauge
  * @things-elements/things-scene-mqtt
  * @things-elements/things-scene-firebase
  * @things-elements/things-scene-stomp
  * @things-elements/things-scene-random
  * @things-elements/things-scene-restful
  * @things-elements/things-scene-google-map
  * @things-elements/things-scene-indoor-map
  * @things-elements/things-scene-wheel-sorter
  * ...
### HTML import => ES6 import
### Component Migration
#### 구조
* 기존 things-designer-elements 의 editor 컴포넌트들은 프로젝트의 components 안에 내장함
* things-scene-viewer 는 프로젝트의 components/things-shell 컴포넌트로 내장함
* paper-color-picker 는 프로젝트의 components/paper-color-picker 컴포넌트로 내장함
* polymer 3를 위한 작업
 * hybrid 또는 polymer 2 모델로 마이그레이션
 * npm dependency와 import 연결 작업
 * js코드 내로 template 포함작업 - 일부 polymer modulizer 를 활용해서 변환, 일부는 Polymer 2(ES6 클래스모델)로 전환함
 * behaviors properties => Behaviors Mixin
 * listner property 마이그레이션
 * 'is' 컴포넌트들 마이그레이션. dom-if, dom-repeat, things-editor-number-input, things-editor-angle-input
 * content => slot
 * $$ => root.querySelectorAll
 * ..
#### 컴포넌트들
* paper-color-picker
 * polymer 3 작업
 * things-editor-color-input 에서 활용할 때, paper-color-picker를 동적으로 생성하고 사용후 소멸시키도록 함.
* things-shell
* things-editor-xxxx
 * things-editor-properties와 things-editor-property 이벤트 연결 관계 단순화 작업
 * things-editor-script 를 대체할 수 있는 things-editor-code 를 추가
 * things-editor-image는 제거하고, 단순한 text input 으로 대체함.
## [ Webpack 적용 ]
## [ Serverless - 서버프레임워크 종속성을 제거하기 위함임 ]
### 1. Firebase App 적용 - 진행보류
* polymer-firebase의 polymer 3 미지원으로 진행 보류중임
### 2. Github integration 적용 - 진행중
* Online 모델 리파지토리 용도로 github 리파지토리를 활용하는 방안임.
* github API를 활용하여 모델을 관리하는 기능을 구현 예정임.
### 3. Electron 적용 - 진행중
* Online 모델 리파지토리 용도로 로컬호스트 폴더를 활용하는 방안임.
### 4. image embedding model
* 서버프레임워크의 종속성을 없애기 위해서, 이미지 리파지토리 기능을 제거함
* 모델에 이미지 삽입은 로컬호스트의 이미지를 드래그&드롭 기능으로 넣거나, 외부의 리소스 URL을 입력하도록 함
## [ Component Generator ]
* 컴포넌트 개발 및 테스트 환경을 만들고자 함.
* things-shell 을 포함한 개발 환경으로 될 것임.
* 로컬호스트의 코드와 모델을 참조할 수 있도록 서버리스 구성이 포함될 것임.
* 매뉴얼 자동화 작업이 포함될 것임.
## [ Styling - 진행중 ]
* shadow-dom v1에 맞게 selector 작업
* :before => ::before
* /deep/ ::shadow 제거 => ::slotted(..) 적용
* 작업할 것 많이 남음.
## [ 기타 ]
### ace-builds => codemirror
* ace-builds의 API 복잡성때문에 대안으로 codemirror를 적용하여 things-editor-code 라는 컴포넌트를 추가함.
* 에디터뷰가 inactive 상태에서 에디터 value가 바뀌고, 에디터가 active 되었을 때 바뀐 value가 반영되지 않는 문제는 여전히 해결되지 않음.
* 텍스트 데이타 overflow시 scroll 관련한 스타일링을 보완할 필요가 있음.
### Grid replacement for Table and Chart Data - 방안 고민중
* dataludi를 제거하기 위함임


