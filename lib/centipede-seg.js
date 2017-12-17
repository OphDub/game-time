let GamePiece = require('./game-piece.js');
let image = new Image('../images/cloud-body.png');
image.src = ('../images/cloud-body.png');

class CentipedeSeg extends GamePiece {
  constructor(x, y, dx, dy, radius, color) {
    super(x, y);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.reachedLowerHalf = false;
  }

  draw(context) {
    context.drawImage(image, 5, 5, 100, 100, this.x, this.y, 28, 28);
    // context.beginPath();
    // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // context.fillStyle = this.color;
    // context.fill();
  }

  move() {
    if (this.x + this.radius > 720 || this.x - this.radius < 0) {
      this.y += this.dy;
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 744 || this.y - this.radius < 24) {
      this.dy = -this.dy;
      this.y += (this.dy * 2);
      this.reachedLowerHalf = true;
    }

    if (this.reachedLowerHalf) {
      if (this.y - this.radius < 550) {
        this.dy = -this.dy;
        this.y += (this.dy * 2);
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

  checkShrooms(mushroomArray) {
    mushroomArray.forEach( (mushroom) => {
      if (this.isColliding(mushroom)) {
        this.dx = -this.dx;
        this.y += this.dy;
      }
    })
  }

  killPlayer(player) {
    if (this.isColliding(player)) {
      player.die();
      return true;
    }
  }
}

module.exports = CentipedeSeg;