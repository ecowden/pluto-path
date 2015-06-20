var expect = require('chai').expect;
var path = require('path');
var plutoPath = require('../lib/index');
var fixturesPath = path.join(__dirname, 'fixtures');
var simpleTestPath = path.join(fixturesPath, 'dir1');

describe('index', function() {

  describe('the given options', function() {

    it('accept a array of paths', function() {
      return plutoPath([simpleTestPath]).then(assertSimpleBindingWorks);
    });

    it('accept a configuration object', function() {
      return plutoPath({
        path: simpleTestPath
      }).then(assertSimpleBindingWorks);
    });

    it('accept a single paths string', function() {
      return plutoPath(simpleTestPath).then(assertSimpleBindingWorks);
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

});
