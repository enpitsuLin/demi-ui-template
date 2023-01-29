import { series } from 'gulp';
import { runTask } from './utils';

export default series(runTask('buildUniversalBundle'));

export * from './tasks';
