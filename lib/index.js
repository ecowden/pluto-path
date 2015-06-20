var requirePath = require('require-path');
var pluto = require('pluto');
var standardNamingStrategy = require('./standardNamingStrategy');
var lodash = require('lodash');

module.exports = function plutoPath(o) {
  var options;
  if (typeof o === 'string' || lodash.isArray(o)) {
    options = {
      path: o
    };
  } else if (lodash.isObject(o)) {
    options = o;
  } else {
    throw new Error('options must be a string, array or strings or an object');
  }

  return requirePath(options)
    .then(function(components) {

      var plutoModule = pluto.createModule(function(bind) {
        for (var filename in components) {

          var componentName = standardNamingStrategy(filename);

          var factoryFn = components[filename];
          bind(componentName).toFactory(factoryFn);
        }

      });

      return plutoModule;

    });

};
