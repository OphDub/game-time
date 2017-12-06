let CentipedeSeg = require('./centipede-seg.js');
let Mushroom = require('./mushroom.js');

class CentipedeWhole {
  constructor() {
    this.segmentsArray = [[]];
  }

  createCentipede(canvas) {
    let xCenter = canvas.width / 2;

    for (let i = 0; i < 12; i++) {
      let centipedeSeg;
      let segX = xCenter - (i * 24);

      if (i === 0) {
        centipedeSeg = new CentipedeSeg (segX, 36, 6, 24, 12, 'blue');
      } else {
        centipedeSeg = new CentipedeSeg (segX, 36, 6, 24, 12, 'red');
      }
      this.segmentsArray[0].push(centipedeSeg);
    }
  }

  update(context, mushroomArray, player, bulletArray, game) {
    this.centBulletCollision(bulletArray, mushroomArray, game)
    this.colorHead();
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment) => {
        segment.draw(context);
        segment.checkShrooms(mushroomArray);
        segment.move();
        segment.killPlayer(player, game);
      })
    })
    this.isDead(game);
  }

  colorHead() {
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment, index) => {
        if (index === 0) {
          segment.color = 'blue';
        } else {
          segment.color = 'red';
        }
      })
    })
  }

  centBulletCollision(bulletArray, mushroomArray, game) {
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
            game.score += 100;
            mushroomArray.push(newShroom);
          }
        })
      })
    })
  }

  isDead(game) {
    if (this.segmentsArray.length === 0) {
      game.winGame()
    }
  }
}

module.exports = CentipedeWhole;