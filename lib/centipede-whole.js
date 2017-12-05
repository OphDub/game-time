var CentipedeSeg = require('./centipede.js');
var Mushroom = require('./mushroom.js');

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

  update(context, mushroomArray, player) {
    this.colorHead();
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment) => {
        segment.draw(context);
        segment.checkShrooms(mushroomArray);
        segment.move();
        segment.killPlayer(player);
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
    this.segmentsArray.forEach(function(segmentArray, index, ogArray) {
      segmentArray.forEach((seg, segIndex, segArray) => {
        bulletArray.forEach(function(bullet, bulletIndex, bulletArray) {
          if (seg.x - seg.radius < bullet.x + bullet.width &&
            seg.x + seg.radius > bullet.x &&
            seg.y - seg.radius < bullet.y + bullet.height &&
            seg.y + seg.radius > bullet.y) {
              var newShroom = new Mushroom(seg.x, seg.y);
              mushroomArray.push(newShroom);

              var newArray = segArray.splice(segIndex, segArray.length - segIndex);
              
              console.log(newShroom);
              console.log(mushroomArray)
              // console.log('new before', newArray);
              newArray.splice(0,1);
              // console.log('new after', newArray);
              ogArray.push(newArray);
              // console.log('OG', ogArray)
              bulletArray.slice(bulletIndex, 1);
              // debugger;
          }
        })
      })
    })
    // console.log(this.segmentsArray);
  }
}

module.exports = CentipedeWhole;