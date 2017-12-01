var Player = require('./Player.js');
var Mushroom = require('./mushroom.js');
var PlayerBullet = require('./player-bullet.js');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var newPlayer = new Player (canvas.width / 2, canvas.height - 40, 4, 4);
var mushrooms = [];
var bullets = [];

function createMushrooms() {
  for (var i = 0; i < 45; i++) {
    var newShroom = new Mushroom();
    mushrooms.push(newShroom);
  }
};

function createBullets() {
  var newBullet = new PlayerBullet(newPlayer.x + 9, newPlayer.y - 3);
  bullets.push(newBullet);
};

document.addEventListener('keypress', function(event) {
  if(event.keyCode === 32) {
    createBullets();
  }
});

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
};

function clearBullet(bullet) {
  bullets.forEach(function(bullet, index) {
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
  })
};

function playerCollision() {
  var hitShroom;
  mushrooms.forEach(function(mushroom) {
    if (newPlayer.x < mushroom.x + mushroom.width && newPlayer.x + newPlayer.width > mushroom.x) {
      hitShroom = {x: mushroom.x, y: mushroom.y};
      // console.log(hitShroom);
      // newPlayer.x = mushroom.x + mushroom.width;
    }
    
    if (newPlayer.y < mushroom.y + mushroom.height && newPlayer.height + newPlayer.y > mushroom.y) {
      hitShroom = {x: mushroom.x, y: mushroom.y};
      // console.log(hitShroom);
      // newPlayer.y = mushroom.y + mushroom.height;
    }
  }) 
};

function playerMove(mushrooms) {
    if (newPlayer.keyboarder.isDown(37) && newPlayer.x > 0 && newPlayer.x) {
      newPlayer.x -= newPlayer.dx;
      // newPlayer.dx -= 2;
    } else if (newPlayer.keyboarder.isDown(39) && newPlayer.x < (canvas.width - newPlayer.width)) {
      newPlayer.x += newPlayer.dx;
      // newPlayer.dx += 2 ;
    }
  
    if (newPlayer.keyboarder.isDown(38) && newPlayer.y > 550) {
      newPlayer.y -= newPlayer.dx;
      // newPlayer.dy -= 2;
    } else if (newPlayer.keyboarder.isDown(40) && newPlayer.y < (744 - newPlayer.height)) {
      newPlayer.y += newPlayer.dy;
      // newPlayer.dy += 2;
    } 
};

function gameLoop(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //Take a look a refactoring this into one draw function for a singular array of all game bodies
  mushrooms.forEach((mushroom) => {
    mushroom.draw(context);
  })

  newPlayer.draw(context);
  playerMove(playerCollision());
  // newPlayer.move(playerCollision());
  
  bullets.forEach((bullet) => {
    bullet.draw(context).move(canvas);
    bulletCollision(bullet);
    clearBullet(bullet);
  })
  requestAnimationFrame(gameLoop);
};

createMushrooms();
requestAnimationFrame(gameLoop);

// var mushroomBlock = mushrooms.map(function(obj) {
//   var mObj = {};
//   mObj['x'] = obj.x;
//   mObj['y'] = obj.y;
//   return mObj;
// })

// console.log(mushroomBlock);