class Mushroom {
  constructor(x, y) {
    this.x = x || Math.floor((Math.random() * 29)) * 24;
    this.y = y || Math.floor((Math.random() * 28 + 2)) * 24;
    this.width = 24;
    this.height = 24;
    this.color = 'green';
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  collide() {

  }
}

module.exports = Mushroom;