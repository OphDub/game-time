var CentipedeSeg = require('./centipede.js');

class CentipedeWhole {
  constructor() {
    this.segmentsArray = [];
  }

  createCentipede(canvas) {
    var xCenter = canvas.width / 2;

    for (var i = 0; i < 12; i++) {
      var centipedeSeg = new CentipedeSeg (xCenter + (i * 24), 36, 6, 24, 12);
      this.segmentsArray.push(centipedeSeg);
    }
  }

  update(context) {
    this.segmentsArray.forEach((segment) => {
      segment.draw(context);
      segment.move();
    })
  }
}

module.exports = CentipedeWhole;