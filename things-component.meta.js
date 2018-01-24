const path = require('path');
const fs = require('fs');

const thingsDir = path.resolve(__dirname, 'node_modules/@things-elements');
const components = {};

try {
  const folders = fs.readdirSync(thingsDir);

  folders.forEach(function (folder) {
    let pkg = require(path.resolve(thingsDir, folder, 'package.json'));

    components[pkg.name] = {
      path: path.relative(__dirname, path.resolve(thingsDir, folder, pkg.main))
    }
  });
} catch (e) {
  console.error(e);
}

module.exports = {
  components
};
