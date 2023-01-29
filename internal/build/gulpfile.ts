import { series } from 'gulp';
import { runTask } from './utils';

export default series(runTask('buildUniversalBundle'), runTask('buildUniversalModules'));

export * from './tasks';
