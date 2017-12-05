const chai = require('chai');
const expect = chai.expect;

const Mushroom = require('../lib/Mushroom.js');

describe('Mushroom', function() {
  let mushroom;
  beforeEach(function() {
    mushroom = new Mushroom();
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should have a default height and a width', function() {
    expect(mushroom.height).to.equal(24);
    expect(mushroom.width).to.equal(24);
  });

  it('should have a default x and y', function() {
    mushroom = new Mushroom();

    expect(mushroom.x).to.equal(mushroom.x);
    expect(mushroom.y).to.equal(mushroom.y);
  });
});