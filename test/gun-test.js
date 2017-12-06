const chai = require('chai');
const expect = chai.expect;

const Gun = require('../lib/gun.js');
const Bullet = require('../lib/bullet.js');
const Player = require('../lib/player.js');

describe('Gun', function() {
  let x;
  let y;
  let dx;
  let dy;
  let gun;
  let bullet;
  let player;
  beforeEach(function() {
    player = new Player(x, y, dx, dy);
    gun = new Gun(this.player);
    bullet = new Bullet(player.x, player.y);
  });
  
  it.skip('should be able to draw bullets', function() {

  });

  it.skip('should be able to shoot', function() {
    //Pre-condition:
    //gun.isShooting = true;

    //call gun.shoot();

    //gun.createBullets() is called?
    //gun.isShooting = false;
  });

  it.skip('should create bullets', function() {
    gun.createBullets();
    expect(bullet.x).to.equal(player.x + player.width/2 -1);
    expect(bullet.y).to.equal(player.y - 3);
  });

  it.skip('should be able to collide bullets and mushrooms', function() {

  });
});