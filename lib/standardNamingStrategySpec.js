'use strict'

const test = require('ava')

const filenameToComponentName = require('./standardNamingStrategy')

test('standardNamingStrategy drops extensions', function* (t) {
  const actual = filenameToComponentName('target.ext')
  t.is(actual, 'target')
})
test('standardNamingStrategy drops preceding paths', function* (t) {
  const actual = filenameToComponentName('path/target')
  t.is(actual, 'target')
})
