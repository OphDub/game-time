let CentipedeSeg = require('./centipede-seg.js');
let Mushroom = require('./mushroom.js');

class CentipedeWhole {
  constructor() {
    this.segmentsArray = [[]];
    this.level = 1;
  }

  createCentipede() {
    let xCenter = 720 / 2;

    for (let i = 0; i < 12; i++) {
      let centipedeSeg;
      let segX = xCenter - (i * 24);
      let xSpeed;

      if (this.level === 1) {
        xSpeed = 3;
      } else if (this.level === 2) {
        xSpeed = 6;
      } else if (this.level === 3) {
        xSpeed = 12;
      }

      if (i === 0) {
        centipedeSeg = new CentipedeSeg (segX, 36, xSpeed, 24, 12, '#B43089');
      } else {
        centipedeSeg = new CentipedeSeg (segX, 36, xSpeed, 24, 12, '#03A3C6');
      }
      this.segmentsArray[0].push(centipedeSeg);
    }
  }

  update(context, mushroomArray, player, bulletArray, game) {
    this.centBulletCollision(bulletArray, mushroomArray, player);
    this.colorHead();
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment) => {
        segment.draw(context);
        segment.checkShrooms(mushroomArray);
        segment.move();
        if (segment.killPlayer(player)) {
          game.startGame();
        }
      })
    })
  }

  colorHead() {
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment, index) => {
        if (index === 0) {
          segment.color = '#B43089';
        } else {
          segment.color = '#03A3C6';
        }
      })
    })
  }

  centBulletCollision(bulletArray, mushroomArray, player) {
    this.segmentsArray.forEach(function(centBodyArray, segArrayIndex, ogArray) {

      centBodyArray.forEach((centBody, centBodyIndex) => {

        bulletArray.forEach(function(bullet, bulletIndex, bulletArray) {
          if (centBody.isColliding(bullet)) {
            let newShroom = new Mushroom(centBody.x, centBody.y);
            let segmentArray = ogArray.splice(segArrayIndex, 1)[0];
            let left = segmentArray.splice(0, centBodyIndex);

            segmentArray.shift()
            let right = segmentArray;

            if (right.length) {
              ogArray.splice(centBodyIndex, 0, right)
            }
            if (left.length) {
              ogArray.splice(centBodyIndex, 0, left)
            }
            bulletArray.splice(bulletIndex, 1);
            player.score += 100;
            mushroomArray.push(newShroom);
          }
        })
      })
    })
  }

}

module.exports = CentipedeWhole;