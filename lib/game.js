let Player = require('./Player.js');
let Mushroom = require('./mushroom.js');
let CentipedeWhole = require('./centipede-whole.js');

class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Player (348, 728, 12, 12, 'magenta');
    this.mushroomArray = [];
    this.bulletArray = [];
    this.centipede = new CentipedeWhole();
    this.isWon = false;
    this.isLost = false;
    this.score = 0;  
  }

  startGame() {
    this.createMushroomArray();
    this.centipede.createCentipede(this.canvas);
  }

  // endGame() {
  //   this.context.fillStyle = 'white';
  //   this.context.font = '48px san serif';
  //   this.context.textAlign = 'center';
  //   this.context.fillText('YOU LOSE!', 360, 360);
  // }

  winGame() {
    this.isWon = true;
  }

  drawScore() {
    this.context.fillStyle = 'white';
    this.context.font = '20px san serif'; 
    this.context.fillText('SCORE: ' + this.score, 48, 24);
    this.context.fillText('LIVES: ' + this.player.lives, 168, 24);
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
    }else {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.centipede.update(this.context, this.mushroomArray, this.player, this.player.gun.bulletArray, this);
      
      // pull out this forEach and put into update method in mushroom
      // ASK ABOUT THIS~
      this.mushroomArray.forEach((mushroom) => {
        mushroom.draw(this.context);
      });
      
      this.player.update(this.context, this.mushroomArray, this);
      this.drawScore();
      requestAnimationFrame(this.gameLoop.bind(this));
    }

    
  }

  createMushroomArray() {
    for (var i = 0; i < 45; i++) {
      var newShroom = new Mushroom();

      this.mushroomArray.push(newShroom);
    }
  }

// look at putting this in a for loop and moving this to the player function
  checkShrooms(player, mushroomArray) {
    
    mushroomArray.forEach(function(mushroom) {
      if (player.x < mushroom.x + mushroom.width &&
        player.x + player.width > mushroom.x &&
        player.y < mushroom.y + mushroom.height &&
        player.height + player.y > mushroom.y) {
        var collidedShroom = mushroom;

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