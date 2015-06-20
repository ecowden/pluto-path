var expect = require('chai').expect;
var path = require('path');
var plutoPath = require('../lib/index');
var fixturesPath = path.join(__dirname, 'fixtures');

describe('index', function() {

  it('maps js files in the root of the search path to modules', function() {
    return plutoPath([fixturesPath]).then(function(plutoModule) {
      var a = plutoModule.get('a');
      expect(a).to.be.an('object');
      expect(a.b).to.eql(require('./fixtures/b')());
    });
  });

  it('accepts a configuration object', function() {
    return plutoPath({
      path: fixturesPath
    }).then(function(plutoModule) {
      var a = plutoModule.get('a');
      expect(a).to.be.an('object');
      expect(a.b).to.eql(require('./fixtures/b')());
    });
  });

  it('accepts a array of paths', function() {
    return plutoPath({
      path: fixturesPath
    }).then(function(plutoModule) {
      var a = plutoModule.get('a');
      expect(a).to.be.an('object');
      expect(a.b).to.eql(require('./fixtures/b')());
    });
  });

  it('throws a meaningful error if given a bad configuration type', function() {
    expect(function() {
      plutoPath(42);
    }).to.throw(Error, /options must be a string, array or strings or an object/);
  });

});
