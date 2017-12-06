const chai = require('chai');
const expect = chai.expect;

const Bullet = require('../lib/bullet.js');

describe('Bullet', function() {
  let bullet;
  beforeEach(function() {
    bullet = new Bullet(20, 20);
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should have a default height and width', function() {
    expect(bullet.width).to.equal(bullet.width);
    expect(bullet.height).to.equal(bullet.height);
  });

  it('should have a default y velocity', function() {
    expect(bullet.dy).to.equal(bullet.dy);
  });

  it('should take a x,y value', function() {

    expect(bullet.x).to.equal(20);
    expect(bullet.y).to.equal(20);
  });

  it.skip('should be able to draw', function() {
    bullet.draw();
    expect().to.equal();
  });

  it.skip('should be able to move', function() {
    bullet.move();
    expect(bullet.y).to.equal(bullet.y - bullet.dy);
  })
});