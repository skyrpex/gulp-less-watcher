import {Gaze}   from 'gaze';

export default filename => {

  let gaze = null;

  return imports => {
    // Filter node_modules imports.
    imports = imports.filter(filename => !filename.match(/node_modules/));

    const oldGaze = gaze;

    gaze = new Gaze(filename);
    gaze.add(imports);

    if (oldGaze) {
      oldGaze.close();
    }

    return gaze;
  };

};
