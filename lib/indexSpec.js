'use strict'

const test = require('ava')
const co = require('co')
const path = require('path')

const plutoPath = require('./index')
const fixturesPath = path.join(__dirname, 'fixtures')
const simpleTestPath = path.join(fixturesPath, 'dir1')
const complexTestPath = path.join(fixturesPath, 'dir2')
const nestedTestPath = path.join(fixturesPath, 'dir3')

const simpleBindingMacro = co.wrap(function* (t, input, expected) {
  const app = yield plutoPath(simpleTestPath)
  const a = app.get('a')
  t.is(typeof a, 'object')
  t.deepEqual(a.b, require('./fixtures/dir1/b')())
})

simpleBindingMacro.title = (providedTitle, input, expected) => `The main function accepts ${providedTitle}`.trim()

test('a single `path` string', simpleBindingMacro, simpleTestPath)
test('an array of `path` strings', simpleBindingMacro, [simpleTestPath])
test('a configuration object with a `path`', simpleBindingMacro, {
  path: simpleTestPath
})

test('The main function accepts `extraBindings` property in the config object', function* (t) {
  const app = yield plutoPath({
    path: simpleTestPath,
    extraBindings: function (bind) {
      bind('theAnswer').toInstance(42)
    }
  })
  t.is(app.get('theAnswer'), 42)
})

test('The main function rejects with a meaningful error if given a bad configuration type', function* (t) {
  const error = yield t.throws(plutoPath(42), Error)
  t.is(error.message, 'options must be a string, array or strings or an object')
})

test('given complex files, it binds a non-function object using `toInstance`', function* (t) {
  const app = yield plutoPath([complexTestPath, simpleTestPath])
  const actual = app.get('myData')
  const expected = require('./fixtures/dir2/innerDir/myData.json')
  t.is(actual, expected)
})

test('given complex files, it binds a factory function using `toFactory`', function* (t) {
  const app = yield plutoPath([complexTestPath, simpleTestPath])
  const actual = app.get('myFactory')
  const expected = require('./fixtures/dir2/myFactory')()
  t.is(actual.name, expected.name)
})

test('given complex files, it binds a constructor function using `toConstructor`', function* (t) {
  const MyConstructor = require('./fixtures/dir2/MyConstructor')
  const app = yield plutoPath([complexTestPath, simpleTestPath])
  const actual = app.get('MyConstructor')
  t.is(actual.name, MyConstructor.name)
  t.truthy(actual instanceof MyConstructor)
})

test('given complex files, it binds across modules', function* (t) {
  const app = yield plutoPath([complexTestPath, simpleTestPath])
  const actual = app.get('MyConstructor')
  const expected = require('./fixtures/dir1/b')()
  t.is(actual.b.name, expected.name)
})

test('given files in nested folders, it uses the file name and not folder name for determining injection strategy', function* (t) {
  const app = yield plutoPath(nestedTestPath)
  const actual = app.get('MyClass')
  const expectedInjected = require('./fixtures/dir3/subdir/injected')
  t.is(actual.injected, expectedInjected)
})
