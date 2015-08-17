import util from 'gulp-util';

const PLUGIN_NAME = 'gulp-less-watcher';
const {PluginError} = util;

export default err => {
  // Convert the keys so PluginError can read them
  err.lineNumber = err.line;
  err.fileName   = err.filename;

  // Add a better error message
  err.message = `${err.message} in file ${err.fileName} line no. ${err.lineNumber}`;

  return new PluginError(PLUGIN_NAME, err);
};
