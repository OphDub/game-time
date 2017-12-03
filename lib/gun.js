var Bullet = require('./player-bullet.js');

class Gun {
  constructor(player) {
    this.player = player;
    this.bulletArray = [];
    this.isShooting = false;
  }

  draw(context) {
    this.bulletArray.forEach((bullet, index, array) => {
      if (bullet.y < 0) {
        array.splice(index, 1);
      }
      bullet.draw(context);
      bullet.move();
    });
  }

  shoot(context, canvas) {
    if (this.isShooting) {
      this.createBullets();
      this.isShooting = false;
    }
    this.draw(context, canvas);
  }

  createBullets() {
    var bulletX = this.player.x + (this.player.width / 2) - 1;
    var bulletY = this.player.y - 3;
    var bullet = new Bullet(bulletX, bulletY);

    this.bulletArray.push(bullet);
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