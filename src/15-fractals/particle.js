export class Particle {
  constructor(canvasWidth, canvasHeight, image) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = image;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.sizeModifier = Math.random() * 0.2 + 0.1;
    this.width = this.image.width * this.sizeModifier;
    this.height = this.image.height * this.sizeModifier;
    this.speed = Math.random() + 0.2;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;

    if (this.x > this.canvasWidth + this.width) {
      this.x = -this.width;
    }

    if (this.y > this.canvasHeight + this.height) {
      this.y = -this.height;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
