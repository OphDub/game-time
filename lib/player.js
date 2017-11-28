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

		this.KEYS = {
			LEFT: 37,
			RIGHT: 39,
			UP: 38,
			DOWN: 40,
			SPACE: 32,
		};
	}
};

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

	move(e) {
		if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
			this.x -= 2;
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
			this.x += 2 ;
		}

		if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
			this.y -= 2;
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
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