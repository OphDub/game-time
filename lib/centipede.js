var Player = require('./player.js');
var Mushroom = require('./mushroom.js');

class CentipedeSeg {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
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

  checkShrooms(mushroomArray) {
    mushroomArray.forEach( (mushroom) => {
      if (this.x - this.radius < mushroom.x + mushroom.width &&
      this.x + this.radius > mushroom.x &&
      this.y - this.radius < mushroom.y + mushroom.height &&
      this.y + this.radius > mushroom.y) {
        var collidedShroom = mushroom;
        this.dx = -this.dx;
        this.y += this.dy;
      }
    })
  }
}

module.exports = CentipedeSeg;