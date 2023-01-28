'use strict';
const { isVue2 } = require('vue-demi');

if (isVue2) {
  module.exports = require('./dist/v2/index.cjs');
} else {
  module.exports = require('./dist/v3/index.cjs');
}
