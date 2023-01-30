import { parallel, series } from 'gulp'
import { createTask, runTask } from './utils'
import { run } from './utils/process'
import { mkdir } from 'fs-extra'
import { libOutput } from '@demi-ui/build-utils'

export default series(
  createTask('clean', () => run('pnpm run clean')),
  createTask('createOutput', () => mkdir(libOutput, { recursive: true })),

  parallel(
    runTask('buildUniversalBundle'),
    runTask('buildUniversalModules'),
    runTask('copyFullStyle'),
    createTask('buildTypeDefinition', () => run('pnpm run build:type'))
  ),
  runTask('copyFiles'),
  runTask('writePackages')
)

export * from './tasks'
