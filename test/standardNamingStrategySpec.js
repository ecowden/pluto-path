var expect = require('chai').expect;
var filenameToComponentName = require('../lib/filenameToComponentName');

describe('standardNamingStrategy', function() {

  it('drops extensions', function() {
    var actual = filenameToComponentName('target.ext');
    expect(actual).to.equal('target');
  });

  it('drops preceding paths', function() {
    var actual = filenameToComponentName('path/target');
    expect(actual).to.equal('target');
  });

});
