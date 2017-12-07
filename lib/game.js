let Player = require('./Player.js');
let Mushroom = require('./mushroom.js');
let CentipedeWhole = require('./centipede-whole.js');

class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    // this.mushroomArray = [];
    this.player = new Player (348, 728, 12, 24, 'magenta');
    this.bulletArray = [];
    this.centipede = new CentipedeWhole();
    this.isWon = false;
    this.isLost = false;
    this.score = 0;  
  }

  startGame() {
    this.centipede.segmentsArray = [[]];
    this.mushroomArray = [];
    this.createMushroomArray();
    this.centipede.createCentipede(this.canvas);
  }

  winGame() {
    this.isWon = true;
  }

  drawScore() {
    this.context.fillStyle = 'white';
    this.context.font = '20px san serif'; 
    this.context.fillText('SCORE: ' + this.player.score, 48, 24);
    this.context.fillText('LIVES: ' + this.player.lives, 168, 24);
  }

  update() {
    this.drawScore();

    if (this.player.lives === 0) {
      this.isLost = true;
    }
    
    if (this.centipede.segmentsArray.length === 0) {
      this.winGame();
    }
  }

  gameLoop() {
    if (this.isWon) {
      this.context.fillStyle = 'white';
      this.context.font = '48px san serif';
      this.context.textAlign = 'center';
      this.context.fillText('YOU WIN!', 360, 360);
    } else if (this.isLost) {
      this.context.fillStyle = 'white';
      this.context.font = '48px san serif';
      this.context.textAlign = 'center';
      this.context.fillText('YOU LOSE!', 360, 360);
    } else {
      let bullets = this.player.gun.bulletArray;
      let shrooms = this.mushroomArray;
      let gameScore;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.centipede.update(this.context, shrooms, this.player, bullets, this);
      this.mushroomArray.forEach((mushroom) => {
        mushroom.draw(this.context);
      });
      this.player.update(this.context, this.mushroomArray, this);
      this.update();
      requestAnimationFrame(this.gameLoop.bind(this));
    }

    
  }

  createMushroomArray() {
    for (let i = 0; i < 45; i++) {
      let newShroom = new Mushroom();

      this.mushroomArray.push(newShroom);
    }
  }

  // look at putting this in a for loop and moving this to the player function
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