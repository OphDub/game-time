class Mushroom {
  constructor() {
    this.x = Math.floor((Math.random() * 29)) * 24;
    this.y = Math.floor((Math.random() * 28 + 1)) * 24;
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