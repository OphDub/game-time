let Gun = require('./gun.js');
let GamePiece = require('./game-piece.js')

class Player extends GamePiece {
  constructor (x, y, dx, dy, color) {
    super(x, y);
    this.dx = dx;
    this.dy = dy;
    this.width = 24;
    this.height = 24;
    this.gun = new Gun(this);
    this.direction = null;
    this.color = color;
    this.lives = 3;
  }

  update(context, mushroomArray, game) {
    this.draw(context);
    this.gun.shoot(context);
    this.gun.bulletCollision(mushroomArray, game)
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  // refactor this into forLoop?? use let keyboard from index.js??
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
    this.lives--;
    this.x = 348;
    this.y = 728;
  }
}

module.exports = Player;