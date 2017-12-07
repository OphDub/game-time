const chai = require('chai');
const expect = chai.expect;

const CentipedeWhole = require('../lib/centipede-whole.js');
const CentipedeSeg = require('../lib/centipede-seg.js');
const Bullet = require('../lib/bullet.js');
const Mushroom = require('../lib/mushroom.js');
const Player = require('../lib/player.js');

describe('CentipedeWhole', function() {
  let centipede;
  beforeEach(function() {
    centipede = new CentipedeWhole();
  });

  it('expects to return true', function() {
    expect(true).to.equal(true);
  });  

  it('expects to have an empty nested array', function() {
    expect(centipede.segmentsArray).to.deep.equal([[]]);
  });

  it('expects to have a level of 1 by default', function() {
    expect(centipede.level).to.equal(1);
  });

  it('expects to make an array of an array of 12 segments when created', function() {
    centipede.createCentipede();

    expect(centipede.segmentsArray[0].length).to.equal(12);
  });

  it('expects the first segment of each array of segmentsArray to have a color of blue', function() {
    centipede.createCentipede();

    expect(centipede.segmentsArray[0][0].color).to.equal('blue');
  });

  it('expects everything but the head of each array of segmentsArray to have a color of red', function() {
    centipede.createCentipede();

    expect(centipede.segmentsArray[0][1].color).to.equal('red');
  });

  it('expects centipede to split into new arrays when there is a bullet collision', function() {
    let player = new Player();
    let shroomArray = [];
    let bullet = new Bullet(144, 120);
    let bulletArray = [bullet];
    let seg1 = new CentipedeSeg(120, 120, 6, 6, 12);
    let seg2 = new CentipedeSeg(144, 120, 6, 6, 12);
    let seg3 = new CentipedeSeg(168, 120, 6, 6, 12);
    
    centipede.segmentsArray[0] = [seg1, seg2, seg3];

    expect(centipede.segmentsArray[0].length).to.equal(3);

    centipede.centBulletCollision(bulletArray, shroomArray, player);

    expect(shroomArray.length).to.equal(1);
    expect(shroomArray[0].x).to.equal(144);
    expect(shroomArray[0].y).to.equal(120);
    expect(centipede.segmentsArray.length).to.equal(2);
    expect(centipede.segmentsArray[0].length).to.equal(1);
    expect(centipede.segmentsArray[1].length).to.equal(1);
    expect(bulletArray.length).to.equal(0);

  });

  it('expects player score to increment by 100 when centipede segment collides with bullet', function() {
    let player = new Player();
    let shroomArray = [];
    let bullet = new Bullet(144, 120);
    let bulletArray = [bullet];
    let seg1 = new CentipedeSeg(120, 120, 6, 6, 12);
    let seg2 = new CentipedeSeg(144, 120, 6, 6, 12);
    let seg3 = new CentipedeSeg(168, 120, 6, 6, 12);
    centipede.segmentsArray[0] = [seg1, seg2, seg3];

    expect(player.score).to.equal(0);

    centipede.centBulletCollision(bulletArray, shroomArray, player);

    expect(player.score).to.equal(100);    
  });  
});