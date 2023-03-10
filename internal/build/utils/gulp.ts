import { buildRoot } from '@demi-ui/build-utils'
import { run } from './process'

import type { TaskFunction } from 'gulp'

export const createTask = (name: string, task: TaskFunction): TaskFunction => {
  return Object.assign(task, { displayName: name })
}

export const runTask = (name: string): TaskFunction =>
  createTask(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )
