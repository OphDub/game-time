var Gun = require('./gun.js');

class Player {
  constructor (x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 24;
    this.height = 24;
    this.gun = new Gun(this);
    this.direction = null;
  }

  draw(context) {
    context.fillStyle = "rgba(255, 0, 200, 1)";
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

  }
}

module.exports = Player;