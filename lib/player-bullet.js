var Player = require('./Player.js');
var Mushroom = require('./Mushroom.js');

class PlayerBullet {
    constructor (x, y) {
      this.x = x;
      this.y = y;
      this.dy = 5;
      this.width = 2;
      this.height = 5;
    }

    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
        return this;
    }

    move() {
      // if (this.x < Mushroom.x + Mushroom.width && this.x + this.width > Mushroom.x &&) {
      //   console.log('shot');
      // }
      this.y -= this.dy;
    }

    collide() {

    }

}

module.exports = PlayerBullet;