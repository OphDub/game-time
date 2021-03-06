const chai = require('chai');
const expect = chai.expect;

const CentipedeSeg = require('../lib/centipede-seg.js');
const CentipedeWhole = require('../lib/centipede-whole.js');
const Mushroom = require('../lib/mushroom.js');
const Player = require('../lib/player.js');
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

  it('expects to return true', function() {
    expect(true).to.equal(true);
  });

  it('expects to have a canvas and context', function() {
    expect(game.canvas).to.equal(game.canvas);
    expect(game.context).to.equal(game.context);
  });

  it('expects to have a player', function() {
    let playerTest = new Player (348, 728, 12, 24, 'white');
    expect(game.player).to.deep.equal(playerTest);
  });

  it('expects to have an empty bulletArray', function() {
    expect(game.bulletArray.length).to.equal(0);
  });

  it('expects to have a centipede', function() {
    let centipedeTest = new CentipedeWhole();
    expect(game.centipede).to.deep.equal(centipedeTest);
  });

  it('expects to have win and lost properties set to false by default', function() {
    expect(game.isWon).to.equal(false);
    expect(game.isLost).to.equal(false);
  });

  it('expects to have a instruction property set to true by default', function() {
    expect(game.instruction).to.equal(true);
  });

  it('expects to have a level value of 1 by default', function() {
    expect(game.level).to.equal(1);
  });

  it('expects to have startGame method that creates a centipede array and an array of 45 mushrooms', function() {
    game.startGame();

    expect(game.centipede.segmentsArray.length).to.equal(1);
    expect(game.mushroomArray.length).to.equal(45);
  });

  it('expects to have a resetGame method that sets player lives to 3 and score to 0', function() {
    game.player.lives = 1;
    game.player.score = 300;

    game.resetGame();

    expect(game.player.lives).to.equal(3);
    expect(game.player.score).to.equal(0);
  });

  it('expects to win game if level is greater than 3', function() {
    expect(game.isWon).to.equal(false);
    
    game.level = 4;
    
    game.setLevel(game.level);

    expect(game.isWon).to.equal(true);
  });

  it('expects to set Game property to lost if player lives equals zero', function() {
    expect(game.player.lives).to.equal(3);

    game.player.die();
    game.player.die();
    game.player.die();

    expect(game.player.lives).to.equal(0);
    game.update();

    expect(game.isLost).to.equal(true);
  });

  it('expects to increase level of the game and the centipede level when the centipede array.length is equal to 0', function() {
    expect(game.level).to.equal(1);
    expect(game.centipede.level).to.equal(1);

    game.centipede.segmentsArray = [];

    game.update();

    expect(game.level).to.equal(2);
    expect(game.centipede.level).to.equal(2);
  });

  it('expects to set isWon property to true when game is won', function() {
    expect(game.isWon).to.equal(false);
    
    game.winGame();
    
    expect(game.isWon).to.equal(true);
  });

  it('expects to create a mushroom array of 45 mushrooms', function() {
    expect(game.mushroomArray).to.equal(undefined);

    game.createMushroomArray();
    
    expect(game.mushroomArray.length).to.equal(45);
  });

  it('expects to set the player x coordinate to the mushroom (x + mushroom width) when the player collides on its left', function() {
    let mushroom = new Mushroom (100, 120);
    game.mushroomArray = [mushroom];
    game.player = new Player(124, 120, 6, 6, 'white');
    game.player.direction === 'left';

    game.player.move();
    game.checkShrooms(game.player, game.mushroomArray);

    expect(game.player.x).to.equal(124);
  });

  it('expects to set the player x coordinate to the collided mushroom (x - player width) when the player collides on its right', function() {
    let mushroom = new Mushroom (100, 120);
    game.mushroomArray = [mushroom];
    game.player = new Player(76, 120, 6, 6, 'white');
    game.player.direction === 'right';

    game.player.move();
    game.checkShrooms(game.player, game.mushroomArray);

    expect(game.player.x).to.equal(76);
  });

  it('expects to set the player y coordinate to the collided mushroom (y + mushroom height) when the player collides on its top', function() {
    let mushroom = new Mushroom (100, 120);
    game.mushroomArray = [mushroom];
    game.player = new Player(100, 144, 6, 6, 'white');
    game.player.direction === 'up';

    game.player.move();
    game.checkShrooms(game.player, game.mushroomArray);

    expect(game.player.y).to.equal(144);
  });

  it('expects to set the player y coordinate to the collided mushroom (y - player height) when the player collides on its bottom', function() {
    let mushroom = new Mushroom (100, 120);
    game.mushroomArray = [mushroom];
    game.player = new Player(100, 96, 6, 6, 'white');
    game.player.direction === 'down';

    game.player.move();
    game.checkShrooms(game.player, game.mushroomArray);

    expect(game.player.y).to.equal(96);
  });  
});