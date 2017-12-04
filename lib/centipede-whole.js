var CentipedeSeg = require('./centipede.js');

class CentipedeWhole {
  constructor() {
    this.segmentsArray = [[]];
  }
//Call this in the constructor
  createCentipede(canvas) {
    var xCenter = canvas.width / 2;

    for (var i = 0; i < 12; i++) {
      var centipedeSeg = new CentipedeSeg (xCenter + (i * 24), 36, 6, 24, 12);
      this.segmentsArray[0].push(centipedeSeg);
    }
  }

  update(context) {
    this.segmentsArray.forEach((segmentArray) => {
      segmentArray.forEach((segment) => {
        segment.draw(context);
        segment.move();
      })
    })
  }
  
  // centSegCollision(bulletArray) {
  //   this.segmentsArray.forEach(function(segment, SegIndex, segmentsArray) {
  //     bulletArray.forEach(function(bullet, bulletIndex) {
  //       console.log(segment);
  //       console.log(bullet);
  //       if (segment.x + segment.radius >  bullet.x &&
  //         segment.x - segment.radius < (bullet.x + bullet.width) &&
  //         segment.y + segment.radius >  bullet.y &&
  //         segment.y - segment.radius < (bullet.y + bullet.height)) {
  //           console.log('segment hit');
  //       }
  //     })
  //   })
  // }
}

module.exports = CentipedeWhole;