var requirePath = require('require-path');
var pluto = require('pluto');
var standardNamingStrategy = require('./standardNamingStrategy');
var standardBindingStrategy = require('./standardBindingStrategy');
var lodash = require('lodash');

module.exports = function plutoPath(o) {
  var options = buildOptions(o);

  return requirePath(options)
    .then(function(components) {

      var plutoModule = pluto.createModule(function(bind) {
        for (var filename in components) {
          var component = components[filename];

          var componentName = standardNamingStrategy(filename);
          var bindingName = standardBindingStrategy(filename, component);
          bind(componentName)[bindingName](component);
        }

      });

      return plutoModule;

    });

};

function buildOptions(o) {
  if (typeof o === 'string' || lodash.isArray(o)) {
    return {
      path: o
    };
  } else if (lodash.isObject(o)) {
    return o;
  } else {
    throw new Error('options must be a string, array or strings or an object');
  }
}
