import { componentsRoot, libOutput } from '@demi-ui/build-utils'
import Vue from '@vitejs/plugin-vue'
import Vue2 from '@vitejs/plugin-vue2'
import { TaskFunction } from 'gulp'
import { resolve } from 'path'
import { build, type Plugin } from 'vite'
import { createTask } from '../utils'

const vueDemiEntry = (version: 2 | 3) =>
  resolve(
    __dirname,
    `../node_modules/vue-demi/lib/${version === 2 ? 'v2.7' : 'v3'}/index.mjs`
  )

const buildBundle = async (version: 2 | 3) => {
  const plugins: Plugin[] = [version === 2 ? Vue2() : Vue()]

  return build({
    build: {
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: resolve(componentsRoot, 'src', 'index.ts'),
        name: 'DemiUI',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      },
      outDir: resolve(libOutput, 'dist', `v${version}`),
      emptyOutDir: false,
      sourcemap: true,
    },
    plugins,
    resolve: {
      alias: {
        'vue-demi': vueDemiEntry(version),
      },
    },
  })
}

export const buildUniversalBundle: TaskFunction = createTask(
  'buildUniversalBundle',
  () => Promise.all([buildBundle(2), buildBundle(3)])
)
