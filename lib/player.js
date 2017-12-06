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

  isColliding(object) {
    if (this.x < object.x + object.width &&
    this.x + this.width > object.x &&
    this.y < object.y + object.height &&
    this.height + this.y > object.y) {
      return true;
    }
  }

  // checkShrooms(mushroomArray) {
  //   console.log(1);
  //   mushroomArray.forEach(function(mushroom) {
  //     console.log(mushroom);
  //     if (this.isColliding(mushroom)) {
  //       let collidedShroom = mushroom;
  //       console.log('shroomies working')
  //       if (this.direction === 'left') {
  //         this.x = collidedShroom.x + collidedShroom.width;
  //       } else if (this.direction === 'right') {
  //         this.x = collidedShroom.x - this.width;
  //       } else if (this.direction === 'up') {
  //         this.y = collidedShroom.y + collidedShroom.height;
  //       } else if (this.direction === 'down') {
  //         this.y = collidedShroom.y - this.height;
  //       }
  //     }
  //   })
  // }

  // refactor this into forLoop?? use let keyboard from index.js??
  move(canvas) {
    if (this.direction === 'left' && this.x > 0) {
      this.x -= this.dx;
    } else if (this.direction === 'right' && this.x < (canvas.width - this.width)) {
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