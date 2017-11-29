var Player = require('./Player.js');
// var KeyBoarder = require('./Keyboarder.js');
var Mushroom = require('./mushroom.js');
var PlayerBullet = require('./player-bullet.js');


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var newPlayer = new Player (canvas.width / 2, canvas.height - 40, 3, 3);

var mushrooms = [];

function createMushrooms() {
  for (var i = 0; i < 45; i++) {
    var newShroom = new Mushroom();
    
    mushrooms.push(newShroom);
  }
}

var bullets = [];
// var bullet1 = new PlayerBullet(newPlayer.x, newPlayer.y);


function createBullets() {
  var newBullet = new PlayerBullet(newPlayer.x + 9, newPlayer.y - 3);
  bullets.push(newBullet);
}

document.addEventListener('keypress', function(event) {
  if(event.keyCode === 32) {
    console.log('bullets');
    createBullets();
  }
})

function gameLoop(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  mushrooms.forEach((mushroom) => {
    mushroom.draw(context);
  })

  newPlayer.draw(context);
  newPlayer.move(e);

  bullets.forEach((bullet) => {
    bullet.draw(context).move(canvas);
  })

  requestAnimationFrame(gameLoop);
}

createMushrooms();
requestAnimationFrame(gameLoop);