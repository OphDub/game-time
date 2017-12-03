var Player = require('./player.js');
var Mushroom = require('./mushroom.js');

class CentipedeSegment {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = 'red';
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
    }

    this.x += this.dx;
  }

  split() {

  }
}

module.exports = CentipedeSegment;