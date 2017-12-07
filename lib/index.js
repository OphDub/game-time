let Game = require('./game.js');
let cvs = document.getElementById('game');
let ctx = cvs.getContext('2d');
let game = new Game (ctx, cvs);

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

  game.player.move(game.canvas);
  game.checkShrooms(game.player, game.mushroomArray);
  game.player.direction = null;
})

game.startGame();
game.gameLoop();