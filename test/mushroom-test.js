const chai = require('chai');
const expect = chai.expect;

const Mushroom = require('../lib/Mushroom.js');

describe('Mushroom', function() {
  let mushroom;
  beforeEach(function() {
    mushroom = new Mushroom();
  });

  it('expects to return true', function() {
    expect(true).to.equal(true);
  });

  it('expects to have a default height and a width', function() {
    expect(mushroom.height).to.equal(24);
    expect(mushroom.width).to.equal(24);
  });

  it('expects to have a default x and y', function() {
    expect(mushroom.x).to.equal(mushroom.x);
    expect(mushroom.y).to.equal(mushroom.y);
  });

  it('expects to have a default color', function() {
    expect(mushroom.color).to.equal('green');
  })

  it('expects to have a default number of lives', function() {
    expect(mushroom.lives).to.equal(4);
  });

  it('expects to be able to take x and y arguments', function() {
    mushroom = new Mushroom(50, 50);

    expect(mushroom.x).to.equal(50);
    expect(mushroom.y).to.equal(50);
  });
});