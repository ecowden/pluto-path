'use strict'

const requirePath = require('require-path')
const pluto = require('pluto')
const standardNamingStrategy = require('./standardNamingStrategy')
const standardBindingStrategy = require('./standardBindingStrategy')
const lodash = require('lodash')

module.exports = function plutoPath(o) {
  const options = buildOptions(o)

  return requirePath(options)
    .then(function (components) {
      const plutoModule = pluto.createModule(function (bind) {
        for (let filename in components) {
          const component = components[filename]

          const componentName = standardNamingStrategy(filename)
          const bindingName = standardBindingStrategy(filename, component)
          bind(componentName)[bindingName](component)
        }
        if (options.extraBindings) {
          options.extraBindings(bind)
        }
      })

      return plutoModule
    })
}

function buildOptions(o) {
  if (typeof o === 'string' || lodash.isArray(o)) {
    return {
      path: o
    }
  } else if (lodash.isObject(o)) {
    return o
  } else {
    throw new Error('options must be a string, array or strings or an object')
  }
}
