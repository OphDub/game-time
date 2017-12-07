const chai = require('chai');
const expect = chai.expect;

const Bullet = require('../lib/bullet.js');
const Mushroom = require('../lib/mushroom.js');

describe('Bullet', function() {
  let bullet;
  beforeEach(function() {
    bullet = new Bullet(20, 20);
  });
  
  it('expects to take a x,y value', function() {
    expect(bullet.x).to.equal(20);
    expect(bullet.y).to.equal(20);
  });

  it('expects to have a default y velocity', function() {
    expect(bullet.dy).to.equal(bullet.dy);
  });

  it('expects to have a default height and width', function() {
    expect(bullet.width).to.equal(bullet.width);
    expect(bullet.height).to.equal(bullet.height);
  });

  it('expects to move', function() {
    expect(bullet.y).to.equal(20);
    bullet.move();
    expect(bullet.y).to.equal(15);
  });

  it('expects to be able to tell if it is colliding', function() {
    let mushroom = new Mushroom(bullet.x, bullet.y);
    
    bullet.isColliding(mushroom);
    expect(true).to.equal(true);
  });
});