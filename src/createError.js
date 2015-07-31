import util from 'gulp-util';

const PLUGIN_NAME = 'gulp-less-watcher';
const {PluginError} = util;

export default err => new PluginError(PLUGIN_NAME, err);
