class Game {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Player (this.canvas.width / 2, this.canvas.height - 40, 12 , 12);
    this.mushroomArray = [];
    this.bulletArray = [];
    this.centipede = new CentipedeSegment (this.canvas.width / 2, 36, 6, 24, 12);
  };

  startGame() {
    this.createMushroomArray();
    // this.createCentipede();
  };

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mushroomArray.forEach((mushroom) => {
      mushroom.draw(this.context);
    })
  
    this.player.draw(this.context);
    // this.centipede.move(this.canvas).draw(this.context);
    this.centipede.move();
    this.centipede.draw(this.context);

    // this.move();
    // this.player.move(this.mushroomArray);
   /* playerCollision();*/
    // newPlayer.move(playerCollision());
    
    // this.bulletArray.forEach((bullet) => {
    //   bullet.draw(this.context).move(this.canvas);
    //   this.bulletCollision(bullet);
    //   this.clearBullet(bullet);
    // })
    requestAnimationFrame(this.gameLoop.bind(this));
  };

  createMushroomArray() {
    for (var i = 0; i < 45; i++) {
      var newShroom = new Mushroom();
      this.mushroomArray.push(newShroom);
    }
  }

  checkShrooms(player, mushroomArray) {
    
    mushroomArray.forEach(function(mushroom) {

      if (player.x < mushroom.x + mushroom.width &&
        player.x + player.width > mushroom.x &&
        player.y < mushroom.y + mushroom.height &&
        player.height + player.y > mushroom.y) {
       // console.log(mushroom.x + mushroom.width, player.x);
        var collidedShroom = mushroom;
        console.log(mushroom);
      // } 

        if(player.direction === 'left') {
          player.x = collidedShroom.x + collidedShroom.width;
        } else if (player.direction === 'right') {
          player.x = collidedShroom.x - player.width;
        } else if (player.direction === 'up') {
          player.y = collidedShroom.y + collidedShroom.height;
        } else if (player.direction === 'down') {
          player.y = collidedShroom.y - player.height;
        }
    }
  })
  }
}

//   move() {
//     if (this.player.keyboarder.isDown(37) && this.player.x > 0) {
//       this.player.x -= 2;
//     } else if (this.player.keyboarder.isDown(39) && this.player.x < (500 - this.player.width)) {
//       this.player.x += 2 ;
//     }

//     if (this.player.keyboarder.isDown(38) && this.player.y > 550) {
//       this.player.y -= 2;
//     } else if (this.player.keyboarder.isDown(40) && this.player.y < (700 - this.player.height)) {
//       this.player.y += 2;
//     } 
// }

  // createBullets() {
  //   var newBullet = new PlayerBullet(this.player.x + (this.player.width/2) - 1, this.player.y - 3);
  //   this.bulletArray.push(newBullet);
  // };

  // clearBullet(bullet) {
  //   this.bulletArray.forEach(function(bullet, index) {
  //     if (bullet.y < 0) {
  //       bullets.splice(index, 1);
  //     }
  //   })
  // };

  // bulletCollision(bullet) {
  //   this.mushroomArray.forEach(function(mushroom, index, array) {
  //     if (bullet.x < mushroom.x + mushroom.width && 
  //       bullet.x + bullet.width > mushroom.x && 
  //       bullet.y < mushroom.y + mushroom.height && 
  //       bullet.height + bullet.y > mushroom.y) {
  //       array.splice(index, 1);
  //       this.bulletArray.splice(this.bulletArray.indexOf(bullet), 1);
  //     }
  //   })
  //     // Add in if for centipede and bullet
  // };

var Player = require('./Player.js');
var Mushroom = require('./mushroom.js');
var PlayerBullet = require('./player-bullet.js');
var Gun = require('./gun.js');
var CentipedeSegment = require('./centipede.js');

var cvs = document.getElementById('game');
var ctx = cvs.getContext('2d');
var game = new Game (ctx, cvs);

window.addEventListener('keydown', function(e) {
  var keyCodes = [37, 38, 39, 40];
  if (keyCodes.includes(e.keyCode)) {
    e.preventDefault();
  }
  switch(e.keyCode) {
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
  game.player.move();
  game.checkShrooms(game.player, game.mushroomArray);
})
// var newPlayer = new Player (canvas.width / 2, canvas.height - 40, 0.1, 0.1);
// var mushrooms = [];
// var bullets = [];

// function createMushrooms() {
//   for (var i = 0; i < 45; i++) {
//     var newShroom = new Mushroom();
//     mushrooms.push(newShroom);
//   }
// };

//Player Class method
// function createBullets() {
//   var newBullet = new PlayerBullet(newPlayer.x + (newPlayer.width/2) - 1, newPlayer.y - 3);
//   bullets.push(newBullet);
// };

//Player Class method
// document.addEventListener('keypress', function(event) {
//   if(event.keyCode === 32) {
//     game.createBullets();
//   }
// });

//Bullet Class method
// function bulletCollision(bullet) {
//   mushrooms.forEach(function(mushroom, index) {
//     if (bullet.x < mushroom.x + mushroom.width && 
//       bullet.x + bullet.width > mushroom.x && 
//       bullet.y < mushroom.y + mushroom.height && 
//       bullet.height + bullet.y > mushroom.y) {
//       mushrooms.splice(index, 1);
//       // take a look at refactoring this
//       bullets.splice(bullets.indexOf(bullet), 1);
//     }
//   })
//     // Add in if for centipede and bullet
// };

//Bullet Class method
// function clearBullet(bullet) {
//   bullets.forEach(function(bullet, index) {
//     if (bullet.y < 0) {
//       bullets.splice(index, 1);
//     }
//   })
// };

// function playerCollision() {
//   mushrooms.forEach(function(mushroom) {
//     if (newPlayer.x < mushroom.x + mushroom.width &&
//       newPlayer.x + newPlayer.width > mushroom.x &&
//       newPlayer.y < mushroom.y + mushroom.height &&
//       newPlayer.height + newPlayer.y > mushroom.y) {
//         console.log('collision');
//     }
//   }) 
// };

//Player Class method
// function playerMove(mushroomArray) {
//     mushroomArray.forEach(function(mushroom) {
//       //Player moving left
//       if (newPlayer.keyboarder.isDown(37) && newPlayer.x > 0) {
//         if (newPlayer.x <= mushroom.x + mushroom.width && 
//           newPlayer.y < mushroom.y + mushroom.height && 
//             newPlayer.y < mushroom.y + mushroom.height) {
//           console.log('collide left arrow');
//           console.log(newPlayer.x, newPlayer.y);
//           // newPlayer.dx = 0;
//         } else {
//           newPlayer.x -= newPlayer.dx;
//         }
//       }

//       //Player moving right
//       if (newPlayer.keyboarder.isDown(39) && newPlayer.x < (canvas.width - newPlayer.width)) {
//         if (newPlayer.x + newPlayer.width >= mushroom.x &&
//           newPlayer.y < mushroom.y + mushroom.height &&
//             newPlayer.y > mushroom.y - mushroom.height) {
//           console.log('collide right arrow');
//           console.log(newPlayer.x, newPlayer.y);
//           // newPlayer.dx = 0;
//         } else {
//           newPlayer.x += newPlayer.dx;
//         }
//       }
      
//       // if (newPlayer.keyboarder.isDown(37) && newPlayer.x > 0) {
//       //   newPlayer.x -= newPlayer.dx;
//       // } else if (newPlayer.keyboarder.isDown(39) && newPlayer.x < (canvas.width - newPlayer.width)) {
//       //   newPlayer.x += newPlayer.dx;
//       // }
    
//       if (newPlayer.keyboarder.isDown(38) && newPlayer.y > 550) {
//         newPlayer.y -= newPlayer.dx;
//       } else if (newPlayer.keyboarder.isDown(40) && newPlayer.y < (canvas.height - newPlayer.height)) {
//         newPlayer.y += newPlayer.dy;
//       }
//     })
// };

// function gameLoop(e) {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   //Take a look a refactoring this into one draw function for a singular array of all game bodies
//   mushrooms.forEach((mushroom) => {
//     mushroom.draw(context);
//   })

//   newPlayer.draw(context);
//   playerMove(mushrooms);
//  /* playerCollision();*/
//   // newPlayer.move(playerCollision());
  
//   bullets.forEach((bullet) => {
//     bullet.draw(context).move(canvas);
//     bulletCollision(bullet);
//     clearBullet(bullet);
//   })
//   requestAnimationFrame(gameLoop);
// };

// createMushrooms();
// requestAnimationFrame(gameLoop);

game.startGame();
game.gameLoop();