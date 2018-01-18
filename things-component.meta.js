const path = require('path');
const fs = require('fs');

const thingsDir = path.resolve(__dirname, 'node_modules/@things-elements');
const components = {};

try {
  const folders = fs.readdirSync(thingsDir);

  folders.forEach(function (folder) {
    let package = require(path.resolve(thingsDir, folder, './package.json'));

    components[package.name] = {
      path: path.relative(__dirname, path.resolve(thingsDir, folder, package.main))
    }
  });
} catch (e) {
  console.error(e);
}

// const samplesDir = path.resolve(__dirname, 'samples');
// const samples = {};

// try {
//   const files = fs.readdirSync(samplesDir);

//   files.forEach(function (file) {
//     samples[file] = path.resolve(samplesDir, file);
//   });
// } catch(e) {
//   console.error(e);
// }

module.exports = {
  components,
  // samples
};
