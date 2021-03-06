let image = new Image('../images/stars-sprite.png');
image.src = ('../images/stars-sprite.png');

class Mushroom {
  constructor(x, y) {
    this.x = x || Math.floor((Math.random() * 29)) * 24;
    this.y = y || Math.floor((Math.random() * 28 + 2)) * 24;
    this.width = 24;
    this.height = 24;
    // this.colorArray = ['#EFEA5A', '#F29E4C'];
    this.sourceY = Math.floor(Math.random() * 7) * 25.7;
    // this.color = this.colorArray[Math.floor(Math.random() * 2)];
    this.lives = 4;
  }

  draw(context) {
    context.drawImage(image, 0, this.sourceY, 25, 25, this.x, this.y, this.width, this.height);
    // context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

module.exports = Mushroom;