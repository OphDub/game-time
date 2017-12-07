let Player = require('./Player.js');
let Mushroom = require('./mushroom.js');
let CentipedeWhole = require('./centipede-whole.js');
let arrows = document.getElementById('arrows');

class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Player (348, 728, 12, 24, 'magenta');
    this.bulletArray = [];
    this.centipede = new CentipedeWhole();
    this.isWon = false;
    this.isLost = false;
    this.instruction = true;
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

  update() {
    this.drawScore();

    if (this.player.lives === 0) {
      this.isLost = true;
    }
    
    if (this.centipede.segmentsArray.length === 0) {
      this.winGame();
    }
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

  gameLoop() {
    if(this.instruction) {
      this.context.fillStyle = 'white';
      this.context.font = '48px san serif';
      this.context.textAlign = 'center';
      this.context.fillText('Instructions', 360, 200);
      this.context.font = '36px san serif';
      this.context.fillText('Shoot the centipede and avoid getting hit!', 360, 270);
      this.context.fillText('Use ARROW KEYS to Move Player', 360, 350);
      this.context.fillText('Use SPACE BAR to Shoot', 360, 400);
      this.context.fillText('Press R to Reset', 360, 480);
      this.context.fillText('Press P to Play/Pause', 360, 550);
    } else if (this.isWon) {
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
}

module.exports = Game;