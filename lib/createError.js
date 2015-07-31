'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var PLUGIN_NAME = 'gulp-less-watcher';
var PluginError = _gulpUtil2['default'].PluginError;

exports['default'] = function (err) {
  return new PluginError(PLUGIN_NAME, err);
};

module.exports = exports['default'];