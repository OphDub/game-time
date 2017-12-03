var PlayerBullet = require('./player-bullet.js');
var Keyboarder = require('./keyboarder.js');

class Gun {
    constructor(player) {
      this.player = player;
      this.bulletArray = [];
      this.keyboarder = new Keyboarder;
      this.isShooting = false;
    }

    draw(context, canvas) {
      this.bulletArray.forEach((bullet) => {
        console.log(bullet);
        bullet.draw(context);
        bullet.move();
        // this.clearBullet(bullet);
      })  
    }

    shoot(context, canvas) {
      if (this.isShooting) {
        this.createBullets();
        this.isShooting = false;
      }
      this.draw(context, canvas);
      // this.bulletArray.forEach((bullet) => {
      //   bullet.draw(context).move(canvas);
      //   bulletCollision(bullet);
      //   clearBullet(bullet);
      // })
    }
  
    createBullets() {
      var newBullet = new PlayerBullet(this.player.x + (this.player.width/2) - 1, this.player.y - 3);
      this.bulletArray.push(newBullet);
    }
    
    clearBullet(bullet) {
      this.bulletArray.forEach(function(bullet, index) {
        if (bullet.y < 0) {
          bullets.splice(index, 1);
        }
      })
    }
    
    bulletCollision(mushroomArray) {
      this.bulletArray.forEach(function(bullet, bulletIndex, bulletArray) {
        mushroomArray.forEach(function(mushroom, mushroomIndex) {
          if (bullet.x < mushroom.x + mushroom.width && 
          bullet.x + bullet.width > mushroom.x && 
          bullet.y < mushroom.y + mushroom.height && 
          bullet.height + bullet.y > mushroom.y) {
            mushroomArray.splice(mushroomIndex, 1);
            bulletArray.splice(bulletIndex, 1);
          }
        })
      })
    }
}

module.exports = Gun;