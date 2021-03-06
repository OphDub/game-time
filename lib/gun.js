let Bullet = require('./bullet.js');

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
  
  createBullets() {
    let bulletX = this.player.x + (this.player.width / 2) - 1;
    let bulletY = this.player.y - 3;
    let bullet = new Bullet(bulletX, bulletY);

    this.bulletArray.push(bullet);
  }
  
  shoot(context, canvas) {
    if (this.isShooting) {
      this.createBullets();
      this.isShooting = false;
    }
    this.draw(context, canvas);
  }

  bulletCollision(mushroomArray, player) {
    this.bulletArray.forEach(function(bullet, bulletIndex, bulletArray) {
      mushroomArray.forEach(function(mushroom, mushroomIndex) {
        if (bullet.isColliding(mushroom)) {
          bulletArray.splice(bulletIndex, 1);
          mushroom.lives--;
          if (mushroom.lives > 0) {
            mushroom.height -= 6;  
          } else {
            mushroomArray.splice(mushroomIndex, 1);
            player.score += 10;
          }
        }
      })
    })
  }
}

module.exports = Gun;