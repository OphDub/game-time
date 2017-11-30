var Player = require('./Player.js');
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

function createBullets() {
  var newBullet = new PlayerBullet(newPlayer.x + 9, newPlayer.y - 3);
  bullets.push(newBullet);
  console.log(bullets);
}

document.addEventListener('keypress', function(event) {
  if(event.keyCode === 32) {
    console.log('bullets');
    createBullets();
  }
})

function bulletCollision(bullet) {
  mushrooms.forEach(function(mushroom, index) {
    if (bullet.x < mushroom.x + mushroom.width && 
      bullet.x + bullet.width > mushroom.x && 
      bullet.y < mushroom.y + mushroom.height && 
      bullet.height + bullet.y > mushroom.y) {
      mushrooms.splice(index, 1);
      // take a look at refactoring this
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  })
    // Add in if for centipede and bullet
}

function gameLoop(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  mushrooms.forEach((mushroom) => {
    mushroom.draw(context);
  })

  newPlayer.draw(context);
  newPlayer.move(e);
  
  bullets.forEach((bullet) => {
    bullet.draw(context).move(canvas);
    bulletCollision(bullet);
  })

  requestAnimationFrame(gameLoop);
}

createMushrooms();
requestAnimationFrame(gameLoop);