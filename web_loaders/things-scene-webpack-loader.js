const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {

  const scenes = [];

  const options = loaderUtils.getOptions(this) || {};

  var module_path = options.module_path
    ? options.module_path
    : path.resolve(__dirname, '../node_modules');

  try {
    const thingsdir = path.resolve(module_path, '@things-scene');
    const folders = fs.readdirSync(thingsdir);

    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'));
        scenes.push(pkg.name);
      } catch (e) {
        console.warn(e);
      }
    });
  } catch (e) {
    console.warn('[things-scene-webpack-loader]', '@things-scene module folder not found.');
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd();
    const pkg = require(path.resolve(cwd, 'package.json'));
    pkg['things-scene'] && scenes.push(path.resolve(cwd, pkg.main));
  } catch (e) {
    console.error(e);
  }

  return scenes.map(scene => `import '${scene}';\n`).join('');
};
