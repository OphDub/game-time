class Bullet {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.dy = 5;
    this.width = 2;
    this.height = 5;
  }

  draw(context) {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move() {
    this.y -= this.dy;
  }

  isColliding(mushroom) {
    if (this.x < mushroom.x + mushroom.width && 
      this.x + this.width > mushroom.x && 
      this.y < mushroom.y + mushroom.height && 
      this.height + this.y > mushroom.y) {
      return true;
    }
  }
}

module.exports = Bullet;