var expect = require('chai').expect
var standardBindingSelector = require('../lib/standardBindingStrategy')

describe('standardBindingStrategy', function () {
  describe('a component that is not a function', function () {
    it('is bound with `toInstance`', function () {
      var actual = standardBindingSelector('myInstance', {})
      expect(actual).to.equal('toInstance')
    })
  })

  describe('a component that is a function', function () {
    it('with a lower-case name is bound with `toFactory`', function () {
      var actual = standardBindingSelector('myFactory', noop)
      expect(actual).to.equal('toFactory')
    })

    it('with an upper-case name is bound with `toContructor`', function () {
      var actual = standardBindingSelector('MyContructor', noop)
      expect(actual).to.equal('toConstructor')
    })
  })
})

function noop() {

}
