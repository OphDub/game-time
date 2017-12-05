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

  update(context, mushroomArray) {
    this.draw(context);
    this.gun.shoot(context);
    this.gun.bulletCollision(mushroomArray)
    // this.checkShrooms(mushroomArray);
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

  // checkShrooms(mushroomArray) {
    
  //   mushroomArray.forEach(function(mushroom) {
  //     if (this.x < mushroom.x + mushroom.width &&
  //       this.x + this.width > mushroom.x &&
  //       this.y < mushroom.y + mushroom.height &&
  //       this.height + this.y > mushroom.y) {
  //       var collidedShroom = mushroom;

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

  die() {
    this.color = 'orange';
    this.lives--;
    this.x = 348;
    this.y = 728;

    console.log(this.lives)
    if(this.lives <= 0) {
      console.log('game over');
    }

    this.color = 'magenta'
  }
}

module.exports = Player;