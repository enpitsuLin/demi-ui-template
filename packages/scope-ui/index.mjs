import { isVue2 } from 'vue-demi';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

if (isVue2) {
  module.exports = require('./dist/v2/index.js');
} else {
  module.exports = require('./dist/v3/index.js');
}
