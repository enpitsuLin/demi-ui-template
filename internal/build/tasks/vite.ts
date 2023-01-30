import { componentsRoot, libOutput } from '@demi-ui/build-utils'
import Vue from '@vitejs/plugin-vue'
import Vue2 from '@vitejs/plugin-vue2'
import { TaskFunction } from 'gulp'
import { resolve } from 'path'
import { build, type Plugin } from 'vite'
import { createTask } from '../utils'

const buildBundle = async (version: 2 | 3) => {
  const plugins: Plugin[] = [version === 2 ? Vue2() : Vue()]

  return build({
    build: {
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        treeshake: true,
      },
      lib: {
        entry: resolve(componentsRoot, 'index.ts'),
        formats: ['cjs', 'es'],
        fileName: (format) => `index.${format === 'cjs' ? 'cjs' : 'mjs'}`,
      },
      outDir: resolve(libOutput, 'dist', `v${version}`),
      emptyOutDir: false,
      sourcemap: true,
    },
    plugins,
  })
}

export const buildUniversalBundle: TaskFunction = createTask(
  'buildUniversalBundle',
  () => Promise.all([buildBundle(2), buildBundle(3)])
)
