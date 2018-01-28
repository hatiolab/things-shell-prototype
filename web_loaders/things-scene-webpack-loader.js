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

    folders.forEach(function (folder) {
      let pkg = require(path.resolve(thingsDir, folder, './package.json'));
      components.push(pkg.name);
    });
  } catch (e) {
    console.error(e);
  }

  return components.filter(component => excludes.indexOf(component) == -1)
    .map(component => `import '${component}';\n`).join('');
};
