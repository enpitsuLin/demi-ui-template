import { resolve } from 'path';

export const workspace = resolve(__dirname, '..', '..', '..');
export const packagesRoot = resolve(workspace, 'packages');

export const componentsRoot = resolve(packagesRoot, 'components');
export const libRoot = resolve(packagesRoot, 'demi-ui');

export const buildRoot = resolve(workspace, 'internal', 'build');

/** `/packages/demi-ui/dist` */
export const buildOutput = resolve(libRoot, 'dist');
