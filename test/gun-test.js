const chai = require('chai');
const expect = chai.expect;

const Gun = require('../lib/gun.js');
const Bullet = require('../lib/bullet.js');
const Player = require('../lib/player.js');
const Mushroom = require('../lib/mushroom.js');

describe('Gun', function() {
  let gun;
  let bullet;
  let player;
  beforeEach(function() {
    player = new Player(400, 700, 12, 12);
    gun = new Gun(player);
    bullet = new Bullet(400, 700);
  });
  
  it('expects to have a player', function() {
    expect(gun.player).to.equal(gun.player);
  });

  it('expects to have an empty array', function() {
    expect(gun.bulletArray.length).to.equal(0);
  });

  it('expects the isShooting property to be false', function() {
    expect(gun.isShooting).to.equal(false);
  });

  it('expects to create bullets', function() {
    expect(gun.bulletArray.length).to.equal(0);
    gun.createBullets();
    expect(gun.bulletArray.length).to.equal(1);
  });

  it.skip('expects be able to collide bullets and mushrooms', function() {
    mushroom = new Mushroom(400,700);
    expect(mushroom.lives).to.equal(4);
    let shroomArray = [mushroom];
    
    // expect(gun.bulletArray.length).to.equal(0);
    // gun.createBullets();
    // expect(gun.bulletArray.length).to.equal(1);

    gun.bulletCollision(shroomArray);
    gun.bulletCollision(shroomArray);
    gun.bulletCollision(shroomArray);
    gun.bulletCollision(shroomArray);
    expect(mushroom.lives).to.equal(0);

  });
});