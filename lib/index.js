var $canvas = $('#game');
var $context = $canvas[0].getContext('2d');

function gameLoop() {
	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop)