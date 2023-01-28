const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'lib');

function loadVue() {
  try {
    return require('vue');
  } catch (e) {
    return null;
  }
}

function copy(name, version) {
  const src = path.join(dir, `v${version}`, name);
  const dest = path.join(dir, name);
  let content = fs.readFileSync(src, 'utf-8');
  try {
    fs.unlinkSync(dest);
  } catch (error) {}
  fs.writeFileSync(dest, content, 'utf-8');
}

function switchVersion(version) {
  copy('index.cjs', version);
  copy('index.mjs', version);
}
module.exports.loadVue = loadVue;
module.exports.switchVersion = switchVersion;
