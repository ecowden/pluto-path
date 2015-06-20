var path = require('path');

module.exports = function standardNamingStrategy(filename) {
  /*
   * TODO we may want to do some normalization for filenames that are not legal
   * JavaScript names. For instance, we may want to convert `html-case.js`
   * to `htmlCase` since such files would otherwise be un-injectable.
   *
   * We may also want to convert `snake_case.js` to
   * `snakeCase` to better fit with JavaScript naming conventions, but this is
   * less critical since these are legal JavaScript variable names.
   */
  var extension = path.extname(filename);
  var basename = path.basename(filename, extension);
  return basename;
};
