'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _accord = require('accord');

var _accord2 = _interopRequireDefault(_accord);

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _createError = require('./createError');

var _createError2 = _interopRequireDefault(_createError);

var _createWatcher = require('./createWatcher');

var _createWatcher2 = _interopRequireDefault(_createWatcher);

var log = _gulpUtil2['default'].log;

var less = _accord2['default'].load('less');

exports['default'] = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return _through22['default'].obj(function (file, enc, cb) {
    var _this = this;

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb((0, _createError2['default'])('Streaming not supported'));
    }

    var filename = file.path;
    var watch = (0, _createWatcher2['default'])(filename);

    var scan = function scan() {
      var contents = _fs2['default'].readFileSync(filename);
      less.render(contents.toString(), (0, _deepmerge2['default'])(options, { filename: filename })).then(function (_ref) {
        var imports = _ref.imports;

        _this.push(new _vinyl2['default']({
          contents: contents,
          cwd: file.cwd,
          base: file.base,
          path: file.path
        }));

        // Filter node_modules imports.
        imports = imports.filter(function (filename) {
          return !filename.match(/node_modules/);
        });
        watch(imports).on('all', scan);
      })['catch'](function (err) {
        return _this.emit('error', (0, _createError2['default'])(err));
      });
    };

    scan();
  });
};

module.exports = exports['default'];