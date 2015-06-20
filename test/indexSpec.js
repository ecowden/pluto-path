var expect = require('chai').expect;
var path = require('path');
var plutoPath = require('../lib/index');

describe('index', function() {

  it('maps js files in the root of the search path to modules', function() {
    var fixturesPath = path.join(__dirname, 'fixtures');
    return plutoPath([fixturesPath]).then(function(plutoModule) {
      var a = plutoModule.get('a');
      expect(a).to.be.an('object');
      expect(a.b).to.eql(require('./fixtures/b')());
    });
  });

});
