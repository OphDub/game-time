var Game = require('./game.js');
var cvs = document.getElementById('game');
var ctx = cvs.getContext('2d');
var game = new Game (ctx, cvs);

// make let keyboard variable and put in keyCodes and direction (KEEP IN INDEX FILE)

// Make a function that puts the instructions on the screen first
// Then put an addEventListener that toggles the instruction/pause(?) screen back
// starts the gameLoop

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

  //ORDER IS IMPORTANT!
  game.player.move();
  game.checkShrooms(game.player, game.mushroomArray);
  game.player.direction = null;
})

game.startGame();
game.gameLoop();