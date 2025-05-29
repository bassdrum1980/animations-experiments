export class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.width = 50;
    this.height = 50;
  }

  update() {
    this.x++;
    this.y++;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
  }
}
