const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  var thingsDir = path.resolve(__dirname, '../node_modules/@things-elements');
  const components = [];

  const options = loaderUtils.getOptions(this) || {};
  const excludes = options.excludes || [];
  if (options.module_path) {
    thingsDir = path.resolve(options.module_path, '@things-elements');
  }

  try {
    const folders = fs.readdirSync(thingsDir);

    folders.forEach(folder => {
      let pkg = require(path.resolve(thingsDir, folder, 'package.json'));
      components.push(pkg.name);
    });

    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd();
    let pkg = require(path.resolve(cwd, 'package.json'));
    if (pkg['things-shell']) {
      components.push(path.resolve(cwd, pkg.main));
    }
  } catch (e) {
    console.error(e);
  }

  return content + components.filter(component => excludes.indexOf(component) == -1)
    .map(component => `import '${component}';\n`).join('');
};
