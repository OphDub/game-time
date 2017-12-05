var Gun = require('./gun.js');

class Player {
  constructor (x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 24;
    this.height = 24;
    this.gun = new Gun(this);
    this.direction = null;
    this.color = color;
    this.lives = 3;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move() {
    if (this.direction === 'left' && this.x > 0) {
      this.x -= this.dx;
    } else if (this.direction === 'right' && this.x < (720 - this.width)) {
      this.x += this.dx;
    } else if (this.direction === 'up' && this.y > 550) {
      this.y -= this.dy;
    } else if (this.direction === 'down' && this.y < (744 - this.height)) {
      this.y += this.dy;
    }
  }

  die() {
    this.color = 'orange';
    this.lives--;
  }
}

module.exports = Player;