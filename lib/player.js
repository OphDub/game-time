class KeyBoarder {
  constructor() {
    var keyState = {};
    
    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
    };

    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };
  }
}

class Player {
  constructor (x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 20;
    this.height = 20;
    this.keyboarder = new KeyBoarder;
	}

	draw(context) {
    context.fillStyle = "rgba(255, 0, 200, 1)";
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
	}

	move() {
		if (this.keyboarder.isDown(37) && this.x > 0) {
			this.x -= 2;
		} else if (this.keyboarder.isDown(39) && this.x < (500 - this.width)) {
			this.x += 2 ;
		}

		if (this.keyboarder.isDown(38) && this.y > 550) {
			this.y -= 2;
		} else if (this.keyboarder.isDown(40) && this.y < (700 - this.height)) {
			this.y += 2;
		}
	}

	shoot() {

	}

	collide() {

	}

	die() {

	}
}


module.exports = Player;