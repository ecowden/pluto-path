var requireAll = require('require-all');
var path = require('path');
var pluto = require('pluto');

function createModuleFromPaths(paths) {

  var plutoModule = pluto.createModule(function (bind) {

    paths.forEach(function (path) {
      var components = requireAll(path);

      for (var name in components) {
        var factoryFn = components[name];
        bind(name).toFactory(factoryFn);
      }
    });
  });

  return plutoModule;
}

module.exports = {
  createModuleFromPaths: createModuleFromPaths
};
