var CentipedeSeg = require('./centipede.js');
var Mushroom = require('./mushroom.js');

// look into calling create centipede method in the constructor
class CentipedeWhole {
  constructor() {
    this.segmentsArray = [[]];
  }
//Call this in the constructor
  createCentipede(canvas) {
    var xCenter = canvas.width / 2;
    for (var i = 0; i < 12; i++) {
      var centipedeSeg;
      if (i === 0) {
        centipedeSeg = new CentipedeSeg (xCenter - (i * 24), 36, 6, 24, 12, 'blue');
      } else {
        centipedeSeg = new CentipedeSeg (xCenter - (i * 24), 36, 6, 24, 12, 'red');
      }
      this.segmentsArray[0].push(centipedeSeg);
    }
  }

  update(context, mushroomArray, player, bulletArray, game) {
    this.centBulletCollision(bulletArray, mushroomArray)
    this.colorHead();
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment) => {
        segment.draw(context);
        segment.checkShrooms(mushroomArray);
        segment.move();
        segment.killPlayer(player, game);
      })
    })
  }

  colorHead() {
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment, index) => {
        if(index === 0) {
          segment.color = 'blue';
        } else {
          segment.color = 'red';
        }
      })
    })
  }

  centBulletCollision(bulletArray, mushroomArray) {
    this.segmentsArray.forEach(function(centBodyArray, centBodyIndex, ogArray) {

      centBodyArray.forEach((centBody, centBodyIndex, segArray) => {
        
        bulletArray.forEach(function(bullet, bulletIndex, bulletArray) {
          if (centBody.isColliding(bullet)) {
            let newShroom = new Mushroom(centBody.x, centBody.y);
            let segmentArray = ogArray.splice(centBodyIndex, 1)[0];
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
            mushroomArray.push(newShroom);
          }
        })
      })
    })
  }
}

module.exports = CentipedeWhole;