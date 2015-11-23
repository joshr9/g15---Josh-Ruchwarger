var expect = require('chai').expect;
var code = require('../mainTest.js');

describe('hello', function(){
  it('should say "hello"', function(){
    expect(code.hello()).to.equal('hello');
  });
});
