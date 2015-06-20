var requirePath = require('require-path');
var pluto = require('pluto');
var standardNamingStrategy = require('./standardNamingStrategy');

function createModuleFromPaths(paths) {

  var options = {
    path: paths
  };

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

}

module.exports = {
  createModuleFromPaths: createModuleFromPaths
};

// ------
