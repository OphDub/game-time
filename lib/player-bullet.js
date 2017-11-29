var Player = require('./Player.js');

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
      this.y -= this.dy;
    }

    collide() {

    }

}

module.exports = PlayerBullet;