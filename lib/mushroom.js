class Mushroom {
  constructor() {
    this.x = Math.random() * 500;
    this.y = Math.random() * 650;
    this.width = 10;
    this.height = 10;
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