let gamePiece = require('./game-piece.js');
let Player = require('./player.js');
let Mushroom = require('./mushroom.js');
let CentipedeWhole = require('./centipede-whole.js');

class CentipedeSeg extends gamePiece {
  constructor(x, y, dx, dy, radius, color) {
    super(x, y);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.reachedLowerHalf = false;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  move() {
    if (this.x + this.radius > 720 || this.x - this.radius < 0) {
      this.y += this.dy;
      this.dx = -this.dx;
    }  
    
    if (this.y + this.radius > 744 || this.y - this.radius < 24) {
      this.dy = -this.dy;
      this.y += this.dy;
      this.reachedLowerHalf = true;
    }
    
    if (this.reachedLowerHalf) {
      if (this.y - this.radius < 550) {
        this.dy = -this.dy;
        this.y += this.dy;
      }
    }

    this.x += this.dx;
  }

  isColliding(object) {
    if (this.x - this.radius < object.x + object.width &&
      this.x + this.radius > object.x &&
      this.y - this.radius < object.y + object.height &&
      this.y + this.radius > object.y) {
        return true;
      }
  }

// look into making a isColliding method that returns true or false and then pass it into mushroom & centipede function
  checkShrooms(mushroomArray) {
    mushroomArray.forEach( (mushroom) => {
      if (this.isColliding(mushroom)) {
          var collidedShroom = mushroom;
          this.dx = -this.dx;
          this.y += this.dy;
        }

      // if (this.x - this.radius < mushroom.x + mushroom.width &&
      // this.x + this.radius > mushroom.x &&
      // this.y - this.radius < mushroom.y + mushroom.height &&
      // this.y + this.radius > mushroom.y) {
      //   var collidedShroom = mushroom;
      //   this.dx = -this.dx;
      //   this.y += this.dy;
      // }
    })
  }

  killPlayer(player, game) {
    if (this.x - this.radius < player.x + player.width &&
      this.x + this.radius > player.x &&
      this.y - this.radius < player.y + player.height &&
      this.y + this.radius > player.y) {
        player.die();
        if(player.lives <= 0) {
          game.isLost = true;
        }
        game.centipede.segmentsArray = [[]];
        game.mushroomArray = [];
        game.startGame();

      }
  }
}

module.exports = CentipedeSeg;