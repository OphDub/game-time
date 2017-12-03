var PlayerBullet = require('./player-bullet.js');
var Keyboarder = require('./keyboarder.js')

class Gun {
    constructor(player) {
      this.player = player;
      this.bulletArray = [];
      this.keyboarder = new Keyboarder;
    }

    shoot() {
      if (this.keyboarder.isDown(32)) {
        this.createBullets();
      }
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
      this.bulletArray.forEach(function(bullet, bulletIndex) {
        mushroomArray.forEach(function(mushroom, mushroomIndex) {
          if (bullet.x < mushroom.x + mushroom.width && 
          bullet.x + bullet.width > mushroom.x && 
          bullet.y < mushroom.y + mushroom.height && 
          bullet.height + bullet.y > mushroom.y) {
            MushroomArray.splice(mushroomIndex, 1);
            this.bulletArray.splice(bulletIndex, 1);
          }
        })
      })
    }
}

module.exports = Gun;