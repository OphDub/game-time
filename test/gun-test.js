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

  it.skip('expects be able to shoot', function() {
    //Pre-condition:
    //gun.isShooting = true;
    expect(gun.bulletArray.length).to.equal(0);
    //gun.shoot();

    //gun.createBullets() is called?
    //gun.isShooting = false;
  });

  it.skip('expects create bullets', function() {
    gun.createBullets();
    expect(bullet.x).to.equal(player.x + player.width/2 -1);
    expect(bullet.y).to.equal(player.y - 3);
  });

  it.skip('expects be able to collide bullets and mushrooms', function() {

  });
});