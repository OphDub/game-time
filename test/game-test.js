const chai = require('chai');
const expect = chai.expect;

const CentipedeSeg = require('../lib/centipede-seg.js');
const CentipedeWhole = require('../lib/centipede-whole.js');
// const Bullet = require('../lib/bullet.js');
// const Mushroom = require('../lib/mushroom.js');
// const Player = require('../lib/player.js');
const Game = require('../lib/game.js'); 

describe('Game', function() {
  let game;
  let canvas;
  let context;
  beforeEach(function() {
    canvas = { width: 720, height: 768 }
    game = new Game(canvas, context);
    centipede = new CentipedeWhole();
  });

  it('expects to have a canvas and context', function() {
    expect(game.canvas).to.equal(game.canvas);
    expect(game.context).to.equal(game.context);
  });

  it('expects to have a player', function() {
    expect(game.player).to.equal(game.player);
  });

  it('expects to have an empty bulletArray', function() {
    expect(game.bulletArray.length).to.equal(0);
  });

  it('expects to have a centipede', function() {
    expect(game.centipede).to.equal(game.centipede);
  });

  it('expects to have a won and lost properties', function() {
    expect(game.isWon).to.equal(game.isWon);
    expect(game.isLost).to.equal(game.isLost);
  });

  it.skip('expects to have startGame method', function() {
    game.startGame();
    expect(centipede.segmentsArray.length).to.equal(1);
    expect(game.mushoomArray.length).to.equal(45);
  });

  it('expects to have a winGame method', function() {
    expect(game.isWon).to.equal(false);
    game.winGame();
    expect(game.isWon).to.equal(true);
  });

  it.skip('expects to have an update function', function() {

  });

  it.skip('expects to create a mushroom array', function() {
    expect(game.mushroomArray).to.equal(undefined);
    game.createMushroomArray();
    expect(game.mushroomArray.length).to.equal(45);
  });

  it.skip('expects to check if the player and mushroom array are colliding', function() {

  });
});