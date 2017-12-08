let Player = require('./Player.js');
let Mushroom = require('./mushroom.js');
let CentipedeWhole = require('./centipede-whole.js');

class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Player (348, 728, 12, 24, 'white');
    this.bulletArray = [];
    this.centipede = new CentipedeWhole();
    this.isWon = false;
    this.isLost = false;
    this.instruction = true;
    this.level = 1;
  }

  startGame() {
    this.centipede.segmentsArray = [[]];
    this.createMushroomArray();
    this.centipede.createCentipede(this.canvas);
  } 

  resetGame() {
    this.startGame();
    this.player.lives = 3;
    this.player.score = 0;
  }

  setLevel(level) {
    if (level <= 3) {
      this.startGame();
    } else {
      this.winGame();
    }
  }

  update() {
    if (this.player.lives === 0) {
      this.isLost = true;
    }
    
    if (this.centipede.segmentsArray.length === 0) {
      this.level++;
      this.centipede.level++;
      this.setLevel(this.level);
    }
  }

  winGame() {
    this.isWon = true;
  }

  createMushroomArray() {
    this.mushroomArray = [];
    for (let i = 0; i < 45; i++) {
      let newShroom = new Mushroom();

      this.mushroomArray.push(newShroom);
    }
  }

  checkShrooms(player, mushroomArray) {
    
    mushroomArray.forEach(function(mushroom) {
      if (player.isColliding(mushroom)) {
        let collidedShroom = mushroom;

        if (player.direction === 'left') {
          player.x = collidedShroom.x + collidedShroom.width;
        } else if (player.direction === 'right') {
          player.x = collidedShroom.x - player.width;
        } else if (player.direction === 'up') {
          player.y = collidedShroom.y + collidedShroom.height;
        } else if (player.direction === 'down') {
          player.y = collidedShroom.y - player.height;
        }
      }
    })
  }
}

module.exports = Game;