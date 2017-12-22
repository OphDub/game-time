/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	let Game = __webpack_require__(1);
	let cvs = document.getElementById('game');
	let ctx = cvs.getContext('2d');
	let game = new Game(ctx, cvs);

	window.addEventListener('keydown', function (e) {
	  var keyCodes = [32, 37, 38, 39, 40, 80];

	  if (keyCodes.includes(e.keyCode)) {
	    e.preventDefault();
	  }
	  switch (e.keyCode) {
	    case 32:
	      game.player.gun.isShooting = true;
	      break;
	    case 37:
	      game.player.direction = 'left';
	      break;
	    case 39:
	      game.player.direction = 'right';
	      break;
	    case 38:
	      game.player.direction = 'up';
	      break;
	    case 40:
	      game.player.direction = 'down';
	      break;
	    case 80:
	      game.instruction ? game.instruction = false : game.instruction = true;
	      gameLoop();
	      break;
	    case 82:
	      game.resetGame();
	      break;
	  }

	  game.player.move(game.canvas);
	  game.checkShrooms(game.player, game.mushroomArray);
	  game.player.direction = null;
	});

	game.startGame();
	gameLoop();

	function showInstruction(context) {
	  context.fillStyle = '#5FD8AC';
	  context.fillRect(180, 270, 360, 200);

	  context.textAlign = 'center';
	  context.font = '36px arcadeclassicregular';
	  context.fillStyle = '#EFEA5A';
	  context.fillText('Press P', 360, 360);
	  context.fillStyle = 'white';
	  context.fillText('to  Play / Pause', 360, 400);
	}

	function drawScore(context) {
	  context.fillStyle = 'white';
	  context.font = '24px arcadeclassicregular';
	  context.textAlign = 'center';
	  context.fillText('Unicorn vs. Clouds', 360, 24);
	  // context.fillText('LIVES: ' + game.player.lives, 300, 24);
	  // context.fillText('LEVEL:' + game.level, 440, 24);
	  $('.score').text(game.player.score);
	  $('.lives').text(game.player.lives);
	  $('.level').text(game.level);
	}

	function displayWin(context) {
	  context.fillStyle = 'white';
	  context.font = '48px arcadeclassicregular';
	  context.textAlign = 'center';
	  context.fillText('YOU  WIN!', 360, 360);
	}

	function displayLoss(context) {
	  context.fillStyle = 'white';
	  context.font = '48px arcadeclassicregular';
	  context.textAlign = 'center';
	  context.fillText('YOU  LOSE!', 360, 360);
	}

	function gameLoop() {
	  if (game.instruction) {
	    showInstruction(game.context);
	  } else if (game.isWon) {
	    displayWin(game.context);
	  } else if (game.isLost) {
	    displayLoss(game.context);
	  } else {
	    let bullets = game.player.gun.bulletArray;
	    let shrooms = game.mushroomArray;

	    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
	    game.centipede.update(game.context, shrooms, game.player, bullets, game);
	    game.mushroomArray.forEach(mushroom => {
	      mushroom.draw(game.context);
	    });
	    game.player.update(game.context, game.mushroomArray, game);
	    drawScore(game.context);
	    game.update();
	    requestAnimationFrame(gameLoop);
	  }
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	let Player = __webpack_require__(2);
	let Mushroom = __webpack_require__(6);
	let CentipedeWhole = __webpack_require__(7);

	class Game {
	  constructor(context, canvas) {
	    this.canvas = canvas;
	    this.context = context;
	    this.player = new Player(348, 700, 12, 24, 'white');
	    this.bulletArray = [];
	    this.centipede = new CentipedeWhole();
	    this.isWon = false;
	    this.isLost = false;
	    this.instruction = true;
	    this.level = 1;
	  }

	  startGame() {
	    this.centipede.segmentsArray = [[]];
	    this.createMushroomArray();
	    this.centipede.createCentipede(this.canvas);
	  }

	  resetGame() {
	    this.startGame();
	    this.player.lives = 3;
	    this.player.score = 0;
	  }

	  setLevel(level) {
	    if (level <= 3) {
	      this.startGame();
	    } else {
	      this.winGame();
	    }
	  }

	  update() {
	    if (this.player.lives === 0) {
	      this.isLost = true;
	    }

	    if (this.centipede.segmentsArray.length === 0) {
	      this.level++;
	      this.centipede.level++;
	      this.setLevel(this.level);
	    }
	  }

	  winGame() {
	    this.isWon = true;
	  }

	  createMushroomArray() {
	    this.mushroomArray = [];
	    for (let i = 0; i < 45; i++) {
	      let newShroom = new Mushroom();

	      this.mushroomArray.push(newShroom);
	    }
	  }

	  checkShrooms(player, mushroomArray) {

	    mushroomArray.forEach(function (mushroom) {
	      if (player.isColliding(mushroom)) {
	        let collidedShroom = mushroom;

	        if (player.direction === 'left') {
	          player.x = collidedShroom.x + collidedShroom.width;
	        } else if (player.direction === 'right') {
	          player.x = collidedShroom.x - player.width;
	        } else if (player.direction === 'up') {
	          player.y = collidedShroom.y + collidedShroom.height;
	        } else if (player.direction === 'down') {
	          player.y = collidedShroom.y - player.height;
	        }
	      }
	    });
	  }
	}

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	let Gun = __webpack_require__(3);
	let GamePiece = __webpack_require__(5);
	let image = new Image();
	image.src = '../images/unicorn-head.png';

	class Player extends GamePiece {
	  constructor(x, y, dx, dy, color) {
	    super(x, y);
	    this.dx = dx;
	    this.dy = dy;
	    this.width = 24;
	    this.height = 24;
	    this.gun = new Gun(this);
	    this.direction = null;
	    this.color = color;
	    this.score = 0;
	    this.lives = 3;
	  }

	  update(context, mushroomArray) {
	    this.draw(context);
	    this.gun.shoot(context);
	    this.gun.bulletCollision(mushroomArray, this);
	  }

	  draw(context) {
	    context.drawImage(image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
	    // context.fillStyle = this.color;
	    // context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }

	  isColliding(object) {
	    if (this.x < object.x + object.width && this.x + this.width > object.x && this.y < object.y + object.height && this.height + this.y > object.y) {
	      return true;
	    }
	  }

	  move() {
	    if (this.direction === 'left' && this.x > 0) {
	      this.x -= this.dx;
	    } else if (this.direction === 'right' && this.x < 720 - this.width) {
	      this.x += this.dx;
	    } else if (this.direction === 'up' && this.y > 550) {
	      this.y -= this.dy;
	    } else if (this.direction === 'down' && this.y < 744 - this.height) {
	      this.y += this.dy;
	    }
	  }

	  die() {
	    this.lives--;
	    this.x = 348;
	    this.y = 700;
	    // this.y = 728;
	  }
	}

	module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	let Bullet = __webpack_require__(4);

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
	    let bulletX = this.player.x + this.player.width / 2 - 1;
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
	    this.bulletArray.forEach(function (bullet, bulletIndex, bulletArray) {
	      mushroomArray.forEach(function (mushroom, mushroomIndex) {
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
	      });
	    });
	  }
	}

	module.exports = Gun;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	let GamePiece = __webpack_require__(5);

	class Bullet extends GamePiece {
	  constructor(x, y) {
	    super(x, y);
	    this.dy = 5;
	    this.width = 2;
	    this.height = 5;
	    this.colorArray = ['#A4036F', '#048BA8', '#16DB93', '#EFEA5A', '#F29E4C'];
	    this.color = this.colorArray[Math.floor(Math.random() * 5)];
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }

	  move() {
	    this.y -= this.dy;
	  }

	  isColliding(mushroom) {
	    if (this.x < mushroom.x + mushroom.width && this.x + this.width > mushroom.x && this.y < mushroom.y + mushroom.height && this.height + this.y > mushroom.y) {
	      return true;
	    }
	  }
	}

	module.exports = Bullet;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	class GamePiece {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	}

	module.exports = GamePiece;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	let image = new Image('../images/stars-sprite.png');
	image.src = '../images/stars-sprite.png';

	class Mushroom {
	  constructor(x, y) {
	    this.x = x || Math.floor(Math.random() * 29) * 24;
	    this.y = y || Math.floor(Math.random() * 28 + 2) * 24;
	    this.width = 24;
	    this.height = 24;
	    // this.colorArray = ['#EFEA5A', '#F29E4C'];
	    this.sourceY = Math.floor(Math.random() * 7) * 25.7;
	    // this.color = this.colorArray[Math.floor(Math.random() * 2)];
	    this.lives = 4;
	  }

	  draw(context) {
	    context.drawImage(image, 0, this.sourceY, 25, 25, this.x, this.y, this.width, this.height);
	    // context.fillStyle = this.color;
	    // context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }
	}

	module.exports = Mushroom;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	let CentipedeSeg = __webpack_require__(8);
	let Mushroom = __webpack_require__(6);

	class CentipedeWhole {
	  constructor() {
	    this.segmentsArray = [[]];
	    this.level = 1;
	  }

	  createCentipede() {
	    let xCenter = 720 / 2;

	    for (let i = 0; i < 12; i++) {
	      let centipedeSeg;
	      let segX = xCenter - i * 24;
	      let xSpeed;

	      if (this.level === 1) {
	        xSpeed = 3;
	      } else if (this.level === 2) {
	        xSpeed = 6;
	      } else if (this.level === 3) {
	        xSpeed = 12;
	      }

	      if (i === 0) {
	        centipedeSeg = new CentipedeSeg(segX, 36, xSpeed, 24, 12, '#B43089');
	      } else {
	        centipedeSeg = new CentipedeSeg(segX, 36, xSpeed, 24, 12, '#03A3C6');
	      }
	      this.segmentsArray[0].push(centipedeSeg);
	    }
	  }

	  update(context, mushroomArray, player, bulletArray, game) {
	    this.centBulletCollision(bulletArray, mushroomArray, player);
	    this.colorHead();
	    this.segmentsArray.forEach(segmentArray => {
	      segmentArray.forEach(segment => {
	        segment.draw(context);
	        segment.checkShrooms(mushroomArray);
	        segment.move();
	        if (segment.killPlayer(player)) {
	          game.startGame();
	        }
	      });
	    });
	  }

	  colorHead() {
	    this.segmentsArray.forEach(segmentArray => {
	      segmentArray.forEach((segment, index) => {
	        if (index === 0) {
	          segment.color = '#B43089';
	        } else {
	          segment.color = '#03A3C6';
	        }
	      });
	    });
	  }

	  centBulletCollision(bulletArray, mushroomArray, player) {
	    this.segmentsArray.forEach(function (centBodyArray, segArrayIndex, ogArray) {

	      centBodyArray.forEach((centBody, centBodyIndex) => {

	        bulletArray.forEach(function (bullet, bulletIndex, bulletArray) {
	          if (centBody.isColliding(bullet)) {
	            let newShroom = new Mushroom(centBody.x, centBody.y);
	            let segmentArray = ogArray.splice(segArrayIndex, 1)[0];
	            let left = segmentArray.splice(0, centBodyIndex);

	            segmentArray.shift();
	            let right = segmentArray;

	            if (right.length) {
	              ogArray.splice(centBodyIndex, 0, right);
	            }
	            if (left.length) {
	              ogArray.splice(centBodyIndex, 0, left);
	            }
	            bulletArray.splice(bulletIndex, 1);
	            player.score += 100;
	            mushroomArray.push(newShroom);
	          }
	        });
	      });
	    });
	  }

	}

	module.exports = CentipedeWhole;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	let GamePiece = __webpack_require__(5);
	let image = new Image('../images/cloud-body.png');
	image.src = '../images/cloud-body.png';

	class CentipedeSeg extends GamePiece {
	  constructor(x, y, dx, dy, radius, color) {
	    super(x, y);
	    this.dx = dx;
	    this.dy = dy;
	    this.radius = radius;
	    this.color = color;
	    this.reachedLowerHalf = false;
	  }

	  draw(context) {
	    context.drawImage(image, 5, 5, 100, 100, this.x, this.y, 28, 28);
	    // context.beginPath();
	    // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	    // context.fillStyle = this.color;
	    // context.fill();
	  }

	  move() {
	    if (this.x + this.radius > 720 || this.x - this.radius < 0) {
	      this.y += this.dy;
	      this.dx = -this.dx;
	    }

	    if (this.y + this.radius > 744 || this.y - this.radius < 24) {
	      this.dy = -this.dy;
	      this.y += this.dy * 2;
	      this.reachedLowerHalf = true;
	    }

	    if (this.reachedLowerHalf) {
	      if (this.y - this.radius < 550) {
	        this.dy = -this.dy;
	        this.y += this.dy * 2;
	      }
	    }

	    this.x += this.dx;
	  }

	  isColliding(object) {
	    if (this.x - this.radius < object.x + object.width && this.x + this.radius > object.x && this.y - this.radius < object.y + object.height && this.y + this.radius > object.y) {
	      return true;
	    }
	  }

	  checkShrooms(mushroomArray) {
	    mushroomArray.forEach(mushroom => {
	      if (this.isColliding(mushroom)) {
	        this.dx = -this.dx;
	        this.y += this.dy;
	      }
	    });
	  }

	  killPlayer(player) {
	    if (this.isColliding(player)) {
	      player.die();
	      return true;
	    }
	  }
	}

	module.exports = CentipedeSeg;

/***/ })
/******/ ]);