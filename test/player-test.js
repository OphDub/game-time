const chai = require('chai');
const expect = chai.expect;

const Player = require('../lib/player.js');
const Gun = require('../lib/gun.js');
const Mushroom = require('../lib/mushroom.js');

describe('Player', function() {
  let player;
  let gun;

  beforeEach(function() {
    player = new Player (360, 700, 12, 12, 'blue');
    gun = new Gun(player);
  });

  it('expects to return true', function() {
    expect(true).to.equal(true);
  });

  it('expects to have x, y values', function() {
    expect(player.x).to.equal(360);
    expect(player.y).to.equal(700);
  });

  it('expects to have dx, dy values', function() {
    expect(player.dx).to.equal(12);
    expect(player.dy).to.equal(12);
  });

  it('expects to have a width and height by default', function() {
    expect(player.width).to.equal(24);
    expect(player.height).to.equal(24);
  });

  it('expects to have a Gun', function() {
    expect(player.gun).to.deep.equal(gun);
  });

  it('expects to have a direction of null by default', function() {
    expect(player.direction).to.equal(null);
  });

  it('expects to have a color', function() {
    expect(player.color).to.equal('blue');
  });

  it('expects to have a score of zero by default', function() {
    expect(player.score).to.equal(0);
  });

  it('expects to have 3 lives by default', function() {
    expect(player.lives).to.equal(3);
  });

  it('expects to collide with objects', function(){
    let mushroom = new Mushroom(360,700);
    let collideShroom = player.isColliding(mushroom);

    expect(collideShroom).to.equal(true);
  });

  it('expects to move down', function() {
    player.direction = 'down';

    expect(player.y).to.equal(700);
    
    player.move();
    
    expect(player.y).to.equal(712);
  });

  it('expects to move up', function() {
    player.direction = 'up';

    expect(player.y).to.equal(700);

    player.move();

    expect(player.y).to.equal(688);
  });

  it('expects to move left', function() {
    player.direction = 'left';

    expect(player.x).to.equal(360);

    player.move();

    expect(player.x).to.equal(348);
  });

  it('expects to move right', function() {
    player.direction = 'right';

    expect(player.x).to.equal(360);

    player.move();

    expect(player.x).to.equal(372);
  });

  it('expects die to decrease lives and revert back to starting x, y coordinates', function() {
    expect(player.lives).to.equal(3);
    expect(player.x).to.equal(360);
    expect(player.y).to.equal(700);

    player.die();

    expect(player.lives).to.equal(2);
    expect(player.x).to.equal(348);
    expect(player.y).to.equal(728);
  });
});