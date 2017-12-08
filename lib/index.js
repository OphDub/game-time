let Game = require('./game.js');
let cvs = document.getElementById('game');
let ctx = cvs.getContext('2d');
let game = new Game (ctx, cvs);

window.addEventListener('keydown', function(e) {
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
})

game.startGame();
gameLoop();

function showInstruction(context) {
  context.fillStyle = 'white';
  context.font = '48px san serif';
  context.textAlign = 'center';
  context.fillText('Instructions', 360, 200);
  context.font = '36px san serif';
  context.fillText('Shoot centipede and don\'t get hit!', 360, 270);
  context.fillText('Use ARROW KEYS to Move Player', 360, 350);
  context.fillText('Use SPACE BAR to Shoot', 360, 400);
  context.fillText('Press R to Reset', 360, 480);
  context.fillText('Press P to Play/Pause', 360, 550);
}

function drawScore(context) {
  context.fillStyle = 'white';
  context.font = '20px san serif'; 
  context.fillText('SCORE: ' + game.player.score, 100, 24);
  context.fillText('LIVES: ' + game.player.lives, 300, 24);
  context.fillText('LEVEL:' + game.level, 400, 24);
}

function displayWin(context) {
  context.fillStyle = 'white';
  context.font = '48px san serif';
  context.textAlign = 'center';
  context.fillText('YOU WIN!', 360, 360);
}

function displayLoss(context) {
  context.fillStyle = 'white';
  context.font = '48px san serif';
  context.textAlign = 'center';
  context.fillText('YOU LOSE!', 360, 360);
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
    game.mushroomArray.forEach((mushroom) => {
      mushroom.draw(game.context);
    });
    game.player.update(game.context, game.mushroomArray, game);
    drawScore(game.context);
    game.update();
    requestAnimationFrame(gameLoop);
  }
}