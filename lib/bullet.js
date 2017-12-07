let GamePiece = require('./game-piece.js');

class Bullet extends GamePiece {
  constructor (x, y) {
    super(x, y);
    this.dy = 5;
    this.width = 2;
    this.height = 5;
    this.colorArray = ['#A4036F', '#048BA8', '#16DB93', '#EFEA5A', '#F29E4C'];
    this.color = this.colorArray[Math.floor(Math.random() * 5)];
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move() {
    this.y -= this.dy;
  }

  isColliding(mushroom) {
    if (this.x < mushroom.x + mushroom.width && 
    this.x + this.width > mushroom.x && 
    this.y < mushroom.y + mushroom.height && 
    this.height + this.y > mushroom.y) {
      return true;
    }
  }
}

module.exports = Bullet;