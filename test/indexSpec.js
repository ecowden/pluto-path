var expect = require('chai').expect;
var path = require('path');
var plutoPath = require('../lib/index');
var fixturesPath = path.join(__dirname, 'fixtures');
var simpleTestPath = path.join(fixturesPath, 'dir1');
var complexTextPath = path.join(fixturesPath, 'dir2');

/*
 * Note: I don't really like the shape of these tests. While effective,
 * they are too tangled together and will likely prove fragile. Consider
 * rewriting in the future.
 */

describe('index', function() {

  describe('the given options', function() {

    it('accept a single path string', function() {
      return plutoPath(simpleTestPath).then(assertSimpleBindingWorks);
    });

    it('accept an array of paths', function() {
      return plutoPath([simpleTestPath]).then(assertSimpleBindingWorks);
    });

    it('accept a configuration object', function() {
      return plutoPath({
        path: simpleTestPath
      }).then(assertSimpleBindingWorks);
    });

    it('throws a meaningful error if given a bad configuration type', function() {
      expect(function() {
        plutoPath(42);
      }).to.throw(Error, /options must be a string, array or strings or an object/);
    });

    // ------

    function assertSimpleBindingWorks(plutoModule) {
      var a = plutoModule.get('a');
      expect(a).to.be.an('object');
      expect(a.b).to.eql(require('./fixtures/dir1/b')());
    }

  });

  describe('given complex files', function() { // terrible test name

    it('binds a non-function object using `toInstance`', function() {
      return plutoPath(complexTextPath)
        .then(function(plutoModule) {
          var actual = plutoModule.get('myData');
          var expected = require('./fixtures/dir2/innerDir/myData.json');
          expect(actual).to.eql(expected);
        });
    });

    it('binds a factory function using `toFactory`', function() {
      return plutoPath(complexTextPath)
        .then(function(plutoModule) {
          var actual = plutoModule.get('myFactory');
          var expected = require('./fixtures/dir2/myFactory')();
          expect(actual.name).to.eql(expected.name);
        });
    });

    it('binds a constructor function using `toConstructor`', function() {
      return plutoPath([complexTextPath, simpleTestPath])
        .then(function(plutoModule) {
          var actual = plutoModule.get('MyConstructor');
          expect(actual.name).to.eql(require('./fixtures/dir2/MyConstructor').name);
        });
    });

    it('binds across modules', function() {
      return plutoPath([complexTextPath, simpleTestPath])
        .then(function(plutoModule) {
          var actual = plutoModule.get('MyConstructor');
          var expected = require('./fixtures/dir1/b')();
          expect(actual.b.name).to.eql(expected.name);
        });
    });

  });

});
