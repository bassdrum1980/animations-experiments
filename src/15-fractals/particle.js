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
    this.angle = Math.random() * Math.PI * 2;
    this.va = Math.random() * 0.02 - 0.01;
  }

  update() {
    this.angle += this.va;

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
    context.save();

    context.translate(this.x, this.y);
    context.rotate(this.angle);

    context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    context.restore();
  }
}
