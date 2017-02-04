'use strict'

const test = require('ava')
const path = require('path')

const plutoPath = require('./index')
const fixturesPath = path.join(__dirname, 'fixtures')
const simpleTestPath = path.join(fixturesPath, 'dir1')
const complexTextPath = path.join(fixturesPath, 'dir2')

function* simpleBindingMacro(t, input, expected) {
  const plutoModule = yield plutoPath(simpleTestPath)
  const a = plutoModule.get('a')
  expect(a).to.be.an('object')
  expect(a.b).to.eql(require('./fixtures/dir1/b')())
}

simpleBindingMacro.title = (providedTitle, input, expected) => `The main function accepts ${providedTitle}`.trim()

test('a single `path` string', simpleBindingMacro, simpleTestPath)
test('an array of `path` strings', simpleBindingMacro, [simpleTestPath])
test('a configuration object with a `path`', simpleBindingMacro, {
  path: simpleTestPath
})
