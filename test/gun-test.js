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

  it('expects collision between bullet and mushroom to reduce mushroom lives and height and splice bullet from gun array', function() {
    let mushroom = new Mushroom(400,700);
    let shroomArray = [mushroom];
    gun.bulletArray = [bullet];

    expect(shroomArray.length).to.equal(1);
    expect(mushroom.lives).to.equal(4);
    expect(mushroom.height).to.equal(24);
    expect(gun.bulletArray.length).to.equal(1);

    gun.bulletCollision(shroomArray, player);

    expect(shroomArray.length).to.equal(1);
    expect(gun.bulletArray.length).to.equal(0);
    expect(mushroom.lives).to.equal(3);
    expect(mushroom.height).to.equal(18);
  });

  it('expects to collision between bullet and mushroom to splice mushroom from array when mushroom has zero lives', function() {
    let mushroom = new Mushroom(400,700);
    let shroomArray = [mushroom];
    gun.bulletArray = [bullet];

    expect(shroomArray.length).to.equal(1);
    expect(mushroom.lives).to.equal(4);
    expect(gun.bulletArray.length).to.equal(1);

    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);

    expect(shroomArray.length).to.equal(0);
    expect(player.score).to.equal(10);
  });

  it('expects to increase player score when a mushroom is spliced from mushroom array', function() {
    let mushroom = new Mushroom(400,700);
    let shroomArray = [mushroom];
    gun.bulletArray = [bullet];

    expect(shroomArray.length).to.equal(1);
    expect(mushroom.lives).to.equal(4);
    expect(gun.bulletArray.length).to.equal(1);
    expect(player.score).to.equal(0);

    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);
    gun.bulletArray = [bullet];
    gun.bulletCollision(shroomArray, player);

    expect(shroomArray.length).to.equal(0);
    expect(player.score).to.equal(10);
  });
});