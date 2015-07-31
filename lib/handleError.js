'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _createError = require('./createError');

var _createError2 = _interopRequireDefault(_createError);

var PluginError = _gulpUtil2['default'].PluginError;

exports['default'] = function (err) {
  // Convert the keys so PluginError can read them
  err.lineNumber = err.line;
  err.fileName = err.filename;

  // Add a better error message
  err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;

  throw (0, _createError2['default'])(err);
};

module.exports = exports['default'];