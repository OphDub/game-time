const chai = require('chai');
const expect = chai.expect;

const Player = require('../lib/player.js');

describe('Player', function() {
  let player
  beforeEach(function() {
    player = new Player (360, 700, 12, 12, 'blue');
  });

  it.skip('should update', function() {
    
  });

  it.skip('should be able to draw', function() {

  });

  it.skip('should be able to move', function() {
    //Pre-condition:
    //player.x = 400;
    //player.y = 600;

    //call player.move();

    //player.x = 412;
    //player.y = 612;
  });

  it.skip('should be able to die', function() {
    //Pre-condition:
    //player.lives = 3;
    //player.x = 400;
    //player.y = 600;
    
    //call player.die()

    //player.lives = 2;
    //player.x = 348;
    //player.y = 728;
  });
});