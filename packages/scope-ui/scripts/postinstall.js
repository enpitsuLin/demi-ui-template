const pkg = require('../package.json');
const { switchVersion, loadVue } = require('./utils');

const Vue = loadVue();

if (!Vue || typeof Vue.version !== 'string') {
  console.warn(`[${pkg.name}] Vue is not found. Please run "npm install vue" to install.`);
} else if (Vue.version.startsWith('2.')) {
  switchVersion(2);
} else if (Vue.version.startsWith('3.')) {
  switchVersion(3);
} else {
  console.warn(`[${pkg.name}] Vue version v${Vue.version} is not suppported.`);
}
