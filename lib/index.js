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
  context.fillText('Unicorn vs. Clouds',360, 24);
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
    game.mushroomArray.forEach((mushroom) => {
      mushroom.draw(game.context);
    });
    game.player.update(game.context, game.mushroomArray, game);
    drawScore(game.context);
    game.update();
    requestAnimationFrame(gameLoop);
  }
}