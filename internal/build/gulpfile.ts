import { series } from 'gulp';
import { runTask } from './utils';

export default series(runTask('buildBothBundle'));

export * from './tasks';
