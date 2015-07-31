import {Gaze}   from 'gaze';

export default filename => {

  let gaze = null;

  return imports => {
    const oldGaze = gaze;

    gaze = new Gaze(filename);
    gaze.add(imports);

    if (oldGaze) {
      oldGaze.close();
    }

    return gaze;
  };

};
