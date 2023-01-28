import vue from '@vitejs/plugin-vue';
import { createRequire } from 'module';
import { resolve } from 'path';
import { build } from 'vite';

const require = createRequire(import.meta.url);

build({
  plugins: [vue()],
  build: {
    outDir: resolve(require.resolve('scope-ui'), '../dist/v3'),
    rollupOptions: {
      external: ['vue', 'vue-demi']
    },
    lib: {
      name: 'index',
      entry: require.resolve('@scope/components'),
      fileName: (format) => `index.${format === 'cjs' ? 'cjs' : 'mjs'}`,
      formats: ['cjs', 'es']
    }
  }
});
