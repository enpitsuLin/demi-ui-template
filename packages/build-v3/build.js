import vue from '@vitejs/plugin-vue';
import { createRequire } from 'module';
import { resolve } from 'path';
import { build } from 'vite';

const require = createRequire(import.meta.url);

build({
  plugins: [vue()],
  build: {
    outDir: resolve('../../dist/v3'),
    rollupOptions: {
      external: ['vue', 'vue-demi']
    },
    lib: { name: 'index', entry: require.resolve('@scope/components'), fileName: 'index' }
  },
  resolve: {
    alias: {
      vue: resolve('./node_modules/vue/dist/vue.runtime.esm-browser.js'),
      'vue-demi': '../node_modules/vue-demi/lib/v3/index.mjs'
    }
  }
});
