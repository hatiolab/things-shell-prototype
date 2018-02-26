const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  const element_folders = {};

  const options = loaderUtils.getOptions(this) || {};

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
        if (pkg['things-shell']) {
          element_folders[pkg.name] = path.resolve(thingsdir, folder);
        }
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
    if (pkg['things-shell']) {
      element_folders[pkg.name] = cwd;
    }
  } catch (e) {
    console.warn(e);
  }

  var metas = {};

  for (let element in element_folders) {
    let folder = element_folders[element];
    try {
      metas[element] = `${folder}/things-shell.config.js`;
    } catch (e) {
      console.warn(e);
    }
  }

  return 'var metas = [];\n'
    + Object.keys(metas).map((element, idx) => {
      return `import v${idx} from "${metas[element]}";\nmetas["${element}"] = v${idx};`;
    }).join(';\n')
    + ';\nexport default metas;';
};
