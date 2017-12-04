class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Player (348, 728, 12, 12);
    this.mushroomArray = [];
    this.bulletArray = [];
    this.centipede = new CentipedeWhole();

  }

  startGame() {
    this.createMushroomArray();
    this.centipede.createCentipede(this.canvas);
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mushroomArray.forEach((mushroom) => {
      mushroom.draw(this.context);
    })
    this.centipede.update(this.context);
    this.player.draw(this.context);
    this.player.gun.shoot(this.context);
    this.player.gun.bulletCollision(this.mushroomArray);
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  createMushroomArray() {
    for (var i = 0; i < 45; i++) {
      var newShroom = new Mushroom();

      this.mushroomArray.push(newShroom);
    }
  }

  checkShrooms(player, mushroomArray) {
    
    mushroomArray.forEach(function(mushroom) {
      if (player.x < mushroom.x + mushroom.width &&
        player.x + player.width > mushroom.x &&
        player.y < mushroom.y + mushroom.height &&
        player.height + player.y > mushroom.y) {
        var collidedShroom = mushroom;

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
    })
  }
}


var Player = require('./Player.js');
var Mushroom = require('./mushroom.js');
// var CentipedeSeg = require('./centipede.js');
var CentipedeWhole = require('./centipede-whole.js');
var cvs = document.getElementById('game');
var ctx = cvs.getContext('2d');
var game = new Game (ctx, cvs);

window.addEventListener('keydown', function(e) {
  var keyCodes = [32, 37, 38, 39, 40];

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
  }
  game.player.move();
  game.checkShrooms(game.player, game.mushroomArray);
  game.player.direction = null;
})

game.startGame();
game.gameLoop();