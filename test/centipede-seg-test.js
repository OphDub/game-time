const chai = require('chai');
const expect = chai.expect;

const CentipedeSeg = require('../lib/centipede-seg.js');
const Bullet = require('../lib/bullet.js');
const Mushroom = require('../lib/mushroom.js');
const Game = require('../lib/game.js'); 

describe('CentipedeSeg', function() {
  let centipedeSeg;
  beforeEach(function() {
    centipedeSeg = new CentipedeSeg(120, 120, 6, 24, 12, 'blue');
  });

  it('expect to return true', function() {
    expect(true).to.equal(true);
  });

  it('expect to not have reached lower half by default', function() {
    expect(centipedeSeg.reachedLowerHalf).to.equal(false);
  }); 

  it('expect to have an x and y', function() {
    expect(centipedeSeg.x).to.equal(120);
    expect(centipedeSeg.y).to.equal(120);
  })

  it('expect to have an x and y velocity', function() {
    expect(centipedeSeg.dx).to.equal(6);
    expect(centipedeSeg.dy).to.equal(24);
  });

  it('expect to have a radius', function() {
    expect(centipedeSeg.radius).to.equal(12);
  });

  it('expect to have a color', function() {
    expect(centipedeSeg.color).to.equal('blue');
  })

  it('expect to be able to move along the x axis', function() {
    expect(centipedeSeg.x).to.equal(120);
    
    centipedeSeg.move();
    
    expect(centipedeSeg.x).to.equal(126);
  });

  it('expect to switch x direction when segment hits the left canvas wall', function() {
    let centipedeSeg = new CentipedeSeg(12, 36, -6, 24, 12, 'blue');

    centipedeSeg.move();

    expect(centipedeSeg.dx).to.equal(-6);

    centipedeSeg.move();

    expect(centipedeSeg.dx).to.equal(6);
  });

  it('expect to move down one grid block when segment hits the left canvas wall', function() {
    let centipedeSeg = new CentipedeSeg(12, 36, -6, 24, 12, 'blue');
    
    centipedeSeg.move();

    expect(centipedeSeg.y).to.equal(36);

    centipedeSeg.move();

    expect(centipedeSeg.y).to.equal(60);
  });

  it('expect to switch x direction when segment hits the right canvas wall', function() {
    let centipedeSeg = new CentipedeSeg(708, 36, 6, 24, 12, 'blue');

    centipedeSeg.move();

    expect(centipedeSeg.dx).to.equal(6);

    centipedeSeg.move();

    expect(centipedeSeg.dx).to.equal(-6);
  });

  it('expect to move down one grid block when segment hits the right canvas wall', function() {
    let centipedeSeg = new CentipedeSeg(708, 36, 6, 24, 12, 'blue');

    centipedeSeg.move();

    expect(centipedeSeg.y).to.equal(36);

    centipedeSeg.move();

    expect(centipedeSeg.y).to.equal(60);    
  });

  it('expect to move up one grid when segment reaches the bottom canvas wall', function() {

  });

});



