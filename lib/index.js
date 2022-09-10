'use strict'

const co = require('co')
const requirePath = require('require-path')
const pluto = require('@ecowden/pluto')
const standardNamingStrategy = require('./standardNamingStrategy')
const standardBindingStrategy = require('./standardBindingStrategy')
const lodash = require('lodash')

module.exports = co.wrap(function* plutoPath(o) {
  const options = buildOptions(o)

  const components = yield requirePath(options)
  const bind = pluto()
  for (let filename in components) {
    const component = components[filename]

    const componentName = standardNamingStrategy(filename)
    const bindingName = standardBindingStrategy(componentName, component)
    bind(componentName)[bindingName](component)
  }
  if (options.extraBindings) {
    options.extraBindings(bind)
  }

  return bind.bootstrap()
})

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
