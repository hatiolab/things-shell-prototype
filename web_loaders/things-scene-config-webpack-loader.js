const resolve = require('resolve');
const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  const component_folders = [];

  const options = loaderUtils.getOptions(this) || {};
  const excludes = options.excludes || [];

  var module_path = options.module_path
    ? options.module_path
    : path.resolve(__dirname, '../node_modules');

  try {
    const thingsdir = path.resolve(module_path, '@things-elements');
    const folders = fs.readdirSync(thingsdir);

    /**
     * package.json의 things-shell 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'));
        pkg['things-shell'] && component_folders.push(path.resolve(thingsdir, folder));
      } catch (e) {
        console.warn(e);
      }
    });
  } catch (e) {
    console.warn('@things-elements module folder not found.', e);
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd();
    const pkg = require(path.resolve(cwd, 'package.json'));
    pkg['things-shell'] && component_folders.push(cwd);
  } catch (e) {
    console.warn(e);
  }

  return content + component_folders.filter(component => excludes.indexOf(component) == -1)
    .filter(component => {
      try {
        return resolve.sync('./things-shell.config.js', { basedir: component });
      } catch (e) {
        console.warn(e);
        return false;
      }
    })
    .map(component => `import '${component}/things-shell.config.js';\n`).join('');
};

/**
 * 임포트의 결과는...
 * 1. Property Editor들을 모두 import 시킨다.
 * 2. Group별 component 리스트를 완성한다.
 *
 */


/**
 * Modeller를 위한 메타 정보 로더.
 *
 * 1. 컴포넌트 임포트
 *  - entry point를 통한 기회만 제공한다.
 * 2. 컴포넌트 리스트
 *  - 모델러에 포함될 컴포넌트 리스트 (실제로는 하나의 컴포넌트이지만, 컴포넌트 팔레트에는 여러개가 등록될 수 있다.)
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
 * 이 메타정보를 어떻게 관리할까..
 * 1. package.json 에 things-shell 속성을 정의
 *  - 값 : true | config file path(default : things-shell.config.js)
 * 2. things-shell.config.js 파일에 메타정보를 정의하도록 함
 *
 * 메타정보를 참조하여 임포트하는 방법
 * 1. 모델러의 경우와 뷰어의 경우가 다를 것 같은데, 어떻게 구별해서 로딩하지 ?
 * 2. things-scene-component_folders.import 는 컴포넌트 구현만 임포트한다.
 * 3. things-scene-component_folders-with-tools.import 는 모델링을 위한 메타정보를 참조하여 관련정보를 모두 포함하여 컴포넌트를 임포트한다.
 */
