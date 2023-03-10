/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import Vue2 from '@vitejs/plugin-vue2'

export default defineConfig(({ mode }) => {
  let plugins = [Vue()]
  let alias: Record<string, string> = {
    'scope-ui': resolve('./node_modules/scope-ui/dist/v3/index.mjs'),
  }
  if (mode === 'test:2') {
    plugins = [Vue2()]
    alias = {
      'scope-ui': resolve('./node_modules/scope-ui/dist/v2/index.mjs'),
      vue: require.resolve('vue2'),
      '@vue/test-utils': resolve(
        './node_modules/@vue/test-utils-v2/dist/vue-test-utils.esm.js'
      ),
      'vue-template-compiler': resolve(
        './node_modules/vue-template-compiler/build.js'
      ),
    }
  }

  // reset to vitest default
  mode = 'test'

  return {
    plugins,
    test: {
      environment: 'jsdom',
      setupFiles: ['./setup.ts'],
    },
    resolve: { alias },
  }
})
