const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  const components = [];

  const options = loaderUtils.getOptions(this) || {};
  const excludes = options.excludes || [];

  var module_path = options.module_path
    ? options.module_path
    : path.resolve(__dirname, '../node_modules');

  try {
    const thingsdir = path.resolve(module_path, '@things-elements');
    const folders = fs.readdirSync(thingsdir);

    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'));
        components.push(pkg.name);
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
    pkg['things-shell'] && components.push(path.resolve(cwd, pkg.main));
  } catch (e) {
    console.warn(e);
  }

  return components.filter(component => excludes.indexOf(component) == -1)
    .map(component => `import '${component}';\n`).join('');
};
