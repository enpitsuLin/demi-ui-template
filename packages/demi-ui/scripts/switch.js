const pkg = require('../package.json');
const { switchVersion } = require('./utils');

const version = process.argv[2];

if (version == '2') {
  switchVersion(2);
  console.log(`[${pkg.name}] Switched for Vue 2 `);
} else if (version == '3') {
  switchVersion(3);
  console.log(`[${pkg.name}] Switched for Vue 3 `);
} else {
  console.warn(`[${pkg.name}] expecting version "2" or "3" but got "${version}"`);
  process.exit(1);
}
