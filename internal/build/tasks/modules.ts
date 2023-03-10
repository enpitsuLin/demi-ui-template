import {
  componentsRoot,
  excludeFiles,
  libOutput,
  libRoot,
} from '@demi-ui/build-utils'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vue2 from '@vitejs/plugin-vue2'
import glob from 'fast-glob'
import { TaskFunction } from 'gulp'
import { resolve } from 'path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { createTask, writeBundles } from '../utils'

const buildModules = async (version: 2 | 3) => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: resolve(componentsRoot, 'src'),
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      (version === 2 ? vue2 : vue)({ isProduction: true }),
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
    external: ['vue', 'vue-demi'],
    treeshake: false,
  })
  await writeBundles(bundle, [
    {
      format: 'cjs',
      dir: resolve(libOutput, 'lib', `v${version}`),
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: libRoot,
      sourcemap: true,
      entryFileNames: `[name].cjs`,
    },
    {
      format: 'esm',
      dir: resolve(libOutput, 'es', `v${version}`),
      preserveModules: true,
      preserveModulesRoot: libRoot,
      sourcemap: true,
      entryFileNames: `[name].mjs`,
    },
  ])
}

export const buildUniversalModules: TaskFunction = createTask(
  'buildUniversalModules',
  () => Promise.all([buildModules(2), buildModules(3)])
)
