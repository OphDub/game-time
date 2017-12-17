let Gun = require('./gun.js');
let GamePiece = require('./game-piece.js');
let image = new Image();
image.src = ('../images/unicorn-head.png');

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
    this.score = 0;
    this.lives = 3;
  }

  update(context, mushroomArray) {
    this.draw(context);
    this.gun.shoot(context);
    this.gun.bulletCollision(mushroomArray, this);
  }

  draw(context) {
    context.drawImage(image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
    // context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  isColliding(object) {
    if (this.x < object.x + object.width &&
    this.x + this.width > object.x &&
    this.y < object.y + object.height &&
    this.height + this.y > object.y) {
      return true;
    }
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
    this.lives--;
    this.x = 348;
    this.y = 700;
    // this.y = 728;
  }
}

module.exports = Player;