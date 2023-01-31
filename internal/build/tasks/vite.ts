import { componentsRoot, libOutput } from '@demi-ui/build-utils'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from '@vitejs/plugin-vue'
import Vue2 from '@vitejs/plugin-vue2'
import { TaskFunction } from 'gulp'
import { resolve } from 'path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { createTask, writeBundles } from '../utils'
import terser from '@rollup/plugin-terser'

const vueDemiEntry = (version: 2 | 3) =>
  resolve(
    __dirname,
    `../node_modules/vue-demi/lib/${version === 2 ? 'v2.7' : 'v3'}/index.mjs`
  )

const buildBundle = async (version: 2 | 3) => {
  const bundle = await rollup({
    input: resolve(componentsRoot, 'src', 'index.ts'),
    plugins: [
      (version === 2 ? Vue2 : Vue)({ isProduction: true }),
      alias({
        entries: [{ find: 'vue-demi', replacement: vueDemiEntry(version) }],
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: ['vue'],
    treeshake: false,
  })
  return writeBundles(bundle, [
    {
      format: 'es',
      dir: resolve(libOutput, 'dist', `v${version}`),
      entryFileNames: 'index.mjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      format: 'es',
      dir: resolve(libOutput, 'dist', `v${version}`),
      entryFileNames: 'index.js',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [['@babel/preset-env', { targets: ['IE 11'] }]],
          plugins: [
            [
              '@babel/plugin-transform-modules-umd',
              {
                globals: {
                  vue: 'Vue',
                },
                exactGlobals: true,
              },
            ],
          ],
          moduleId: 'DemiUI',
        }),
        terser(),
      ],
    },
  ])
}

export const buildUniversalBundle: TaskFunction = createTask(
  'buildUniversalBundle',
  () => Promise.all([buildBundle(2), buildBundle(3)])
)
