var Player = require('./Player.js');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var newPlayer = new Player (canvas.width / 2, canvas.height - 40, 3, 3);

function gameLoop(e) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	newPlayer.draw(context);
	newPlayer.move(e);

	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);