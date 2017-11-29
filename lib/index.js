var Player = require('./Player.js');
// var Keyboarder = require('./keyboarder.js');
var Mushroom = require('./mushroom.js');


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



function gameLoop(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  mushrooms.forEach((mushroom) => {
    mushroom.draw(context);
  })


  newPlayer.draw(context);
  newPlayer.move(e);

  requestAnimationFrame(gameLoop);
}

createMushrooms();
requestAnimationFrame(gameLoop);