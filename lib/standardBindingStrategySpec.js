'use strict'

const test = require('ava')

var standardBindingSelector = require('./standardBindingStrategy')

test('a component that is not a function is bound with `toInstance`', function* (t) {
  const actual = standardBindingSelector('myInstance', {})
  t.is(actual, 'toInstance')
})

test('a lower-case function is bound with `toFactory`', function* (t) {
  const actual = standardBindingSelector('myFactory', noop)
  t.is(actual, 'toFactory')
})

test('a function with an upper-case name is bound with `toConstructor`', function* (t) {
  const actual = standardBindingSelector('MyContructor', noop)
  t.is(actual, 'toConstructor')
})

function noop() {}
