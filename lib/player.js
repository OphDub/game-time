var KeyBoarder = require('./Keyboarder.js');
var Gun = require('./gun.js')
var PlayerBullet = require('./player-bullet.js');

class Player {
  constructor (x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 24;
    this.height = 24;
    this.keyboarder = new KeyBoarder;
    this.gun = new Gun(this);
	}

	draw(context) {
    context.fillStyle = "rgba(255, 0, 200, 1)";
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  // move(mushroomArray) {
  //   console.log(this);
  //   mushroomArray.forEach(function(mushroom) {
  //     //Player moving left
  //     if (this.keyboarder.isDown(37) && this.x > 0) {
  //       if (this.x <= mushroom.x + mushroom.width && 
  //         this.y < mushroom.y + mushroom.height && 
  //           this.y < mushroom.y + mushroom.height) {
  //         console.log('collide left arrow');
  //         console.log(this.x, this.y);
  //         // newPlayer.dx = 0;
  //       } else {
  //         this.x -= this.dx;
  //       }
  //     }

  //     //Player moving right
  //     if (this.keyboarder.isDown(39) && this.x < (canvas.width - this.width)) {
  //       if (this.x + this.width >= mushroom.x &&
  //         this.y < mushroom.y + mushroom.height &&
  //           this.y > mushroom.y - mushroom.height) {
  //         console.log('collide right arrow');
  //         console.log(this.x, this.y);
  //         // newPlayer.dx = 0;
  //       } else {
  //         this.x += this.dx;
  //       }
  //     }
      
  //     // if (newPlayer.keyboarder.isDown(37) && newPlayer.x > 0) {
  //     //   newPlayer.x -= newPlayer.dx;
  //     // } else if (newPlayer.keyboarder.isDown(39) && newPlayer.x < (canvas.width - newPlayer.width)) {
  //     //   newPlayer.x += newPlayer.dx;
  //     // }
    
  //     if (this.keyboarder.isDown(38) && this.y > 550) {
  //       this.y -= this.dx;
  //     } else if (this.keyboarder.isDown(40) && this.y < (canvas.height - this.height)) {
  //       this.y += this.dy;
  //     }
  //   })
  // };
// TAKE A LOOK AT THIS!!! How do we pull x/y values from playerCollision
	move() {
      if (this.keyboarder.isDown(37) && this.x > 0) {
  			this.x -= 2;
  		} else if (this.keyboarder.isDown(39) && this.x < (500 - this.width)) {
  			this.x += 2 ;
  		}

  		if (this.keyboarder.isDown(38) && this.y > 550) {
  			this.y -= 2;
  		} else if (this.keyboarder.isDown(40) && this.y < (700 - this.height)) {
  			this.y += 2;
  		} 
	}

	// shoot() {
 //    if (this.keyboarder.isDown(32)) {
      
 //    }
	// }

	die() {

	}
}

module.exports = Player;