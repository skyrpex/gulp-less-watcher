import fs       from 'fs';
import path     from 'path';
import accord   from 'accord';
import File     from 'vinyl';
import through2 from 'through2';
import util     from 'gulp-util';
import merge    from 'deepmerge';

import createError   from './createError';
import createWatcher from './createWatcher';

const {log} = util;
const less  = accord.load('less');

export default (options = {}) => {
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(createError('Streaming not supported'));
    }

    const filename = file.path;
    const watch    = createWatcher(filename);

    const scan = () => {
      const contents = fs.readFileSync(filename);
      less.render(contents.toString(), merge(options, { filename })).then(({imports}) => {

        this.push(new File({
          contents,
          cwd: file.cwd,
          base: file.base,
          path: file.path,
        }));

        // Filter node_modules imports.
        imports = imports.filter(filename => !filename.match(/node_modules/));
        watch(imports).on('all', scan);

      }).catch(err => this.emit('error', createError(err)));
    };

    scan();
  });
};
