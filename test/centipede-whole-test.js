const chai = require('chai');
const expect = chai.expect;

const CentipedeWhole = require('../lib/centipede-whole.js');
const CentipedeSeg = require('../lib/centipede-seg.js');

describe('CentipedeWhole', function() {
  let centipede;
  beforeEach(function() {
    centipede = new CentipedeWhole();
  });

  it('expect to return true', function() {
    expect(true).to.equal(true);
  });  

  it('expect to have an empty nested array', function() {
    expect(centipede.segmentsArray).to.deep.equal([[]]);
  });

  it('expect to make an array of an array of 12 segments when created', function() {
    centipede.createCentipede();
    expect(centipede.segmentsArray[0].length).to.equal(12);
  });

  it('expect the first segment of each array of segmentsArray to have a color of blue', function() {
    centipede.createCentipede();
    expect(centipede.segmentsArray[0][0].color).to.equal('blue');
  });

  it('expect everything but the head of each array of segmentsArray to have a color of red', function() {
    centipede.createCentipede();
    expect(centipede.segmentsArray[0][1].color).to.equal('red');
  });

  it('expect ', function() {

  });  
})