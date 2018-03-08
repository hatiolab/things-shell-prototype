const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  const scene_folders = {};

  const options = loaderUtils.getOptions(this) || {};

  var module_path = options.module_path
    ? options.module_path
    : path.resolve(__dirname, '../node_modules');

  try {
    const thingsdir = path.resolve(module_path, '@things-scene');
    const folders = fs.readdirSync(thingsdir);

    /**
     * package.json의 things-shell 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'));
        if (pkg['things-scene']) {
          scene_folders[pkg.name] = path.resolve(thingsdir, folder);
        }
      } catch (e) {
        console.warn(e);
      }
    });
  } catch (e) {
    console.warn('@things-scene module folder not found.', e);
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd();
    const pkg = require(path.resolve(cwd, 'package.json'));
    if (pkg['things-scene']) {
      scene_folders[pkg.name] = cwd;
    }
  } catch (e) {
    console.warn(e);
  }

  var metas = {};

  for (let scene in scene_folders) {
    let folder = scene_folders[scene];
    try {
      metas[scene] = `${folder}/things-scene.config.js`;
    } catch (e) {
      console.warn(e);
    }
  }

  return 'var metas = [];\n'
    + Object.keys(metas).map((scene, idx) => {
      return `import v${idx} from "${metas[scene]}";\nmetas["${scene}"] = v${idx};`;
    }).join(';\n')
    + ';\nexport default metas;';
};
