import { componentsRoot, libOutput } from '@demi-ui/build-utils'
import Vue from '@vitejs/plugin-vue'
import Vue2 from '@vitejs/plugin-vue2'
import concat from 'gulp-concat'
import minfycss from 'gulp-minify-css'
import { TaskFunction, src, dest } from 'gulp'
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
          exports: 'named',
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

const buildBundleStyle = async () => {
  src('**/*.css', { cwd: componentsRoot, absolute: true })
    .pipe(concat('style.css'))
    .pipe(minfycss())
    .pipe(dest(resolve(libOutput, 'dist')))
}

export const buildUniversalBundle: TaskFunction = createTask(
  'buildUniversalBundle',
  () => Promise.all([buildBundle(2), buildBundle(3), buildBundleStyle()])
)
