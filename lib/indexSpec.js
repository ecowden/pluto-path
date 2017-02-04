'use strict'

const test = require('ava')
const path = require('path')

const plutoPath = require('./index')
const fixturesPath = path.join(__dirname, 'fixtures')
const simpleTestPath = path.join(fixturesPath, 'dir1')
const complexTextPath = path.join(fixturesPath, 'dir2')

function* simpleBindingMacro(t, input, expected) {
  const app = yield plutoPath(simpleTestPath)
  const a = app.get('a')
  t.is(typeof a, 'object')
  t.deepEqual(a.b, require('./fixtures/dir1/b')())
}

simpleBindingMacro.title = (providedTitle, input, expected) => `The main function accepts ${providedTitle}`.trim()

test('a single `path` string', simpleBindingMacro, simpleTestPath)
test('an array of `path` strings', simpleBindingMacro, [simpleTestPath])
test('a configuration object with a `path`', simpleBindingMacro, {
  path: simpleTestPath
})

test('The main function accepts additional manual bindings', function* (t) {
  const app = yield plutoPath({
    path: simpleTestPath,
    extraBindings: function (bind) {
      bind('theAnswer').toInstance(42)
    }
  })
  t.is(app.get('theAnswer'), 42)
})

test('The main function throws a meaningful error if given a bad configuration type', function* (t) {
  const error = t.throws(() => {
    plutoPath(42)
  }, Error)
  t.is(error.message, 'options must be a string, array or strings or an object')
})
