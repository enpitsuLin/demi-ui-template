import { resolve } from 'path'

export const workspace = resolve(__dirname, '..', '..', '..')
export const packagesRoot = resolve(workspace, 'packages')

export const componentsRoot = resolve(packagesRoot, 'components')
export const libRoot = resolve(packagesRoot, 'demi-ui')

export const buildRoot = resolve(workspace, 'internal', 'build')

/** `/dist` */
export const buildOutput = resolve(workspace, 'dist')
/** `/dist/demi-ui` */
export const libOutput = resolve(buildOutput, 'demi-ui')

export const libPackage = resolve(libRoot, 'package.json')
