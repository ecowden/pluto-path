'use strict'

const lodash = require('lodash')

const STARTS_WITH_CAPITAL = /^[A-Z]/

/**
 * Standard strategy for choosing how a component should be bound in Pluto, returning
 * the name of one of Pluto's binding functions.
 */
module.exports = function standardBindingStrategy(name, component) {
  if (!lodash.isFunction(component)) {
    return 'toInstance'
  }
  if (name.match(STARTS_WITH_CAPITAL)) {
    return 'toConstructor'
  }
  return 'toFactory'
}
