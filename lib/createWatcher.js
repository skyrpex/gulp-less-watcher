'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _gaze = require('gaze');

exports['default'] = function (filename) {

  var gaze = null;

  return function (imports) {
    // Filter node_modules imports.
    imports = imports.filter(function (filename) {
      return !filename.match(/node_modules/);
    });

    var oldGaze = gaze;

    gaze = new _gaze.Gaze(filename);
    gaze.add(imports);

    if (oldGaze) {
      oldGaze.close();
    }

    return gaze;
  };
};

module.exports = exports['default'];