/**
 * Fractal class for efficient fractal rendering on Canvas.
 *
 * Standard Canvas workflows recalculate and redraw the entire scene on each frame,
 * which is computationally expensive and not optimal for fractal generation.
 *
 * This class is designed to:
 *  - Calculate fractal shapes once within the Fractal class.
 *  - Convert the resulting shapes into pixel data.
 *  - Assign each pixel to an instance of the Particle class.
 *  - Manage and animate all Particle instances via the Rain class.
 *
 * This approach separates fractal calculation from animation, improving performance
 * and scalability for complex fractal visualizations.
 */
export class Fractal {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.size = this.canvasWidth / 8;
    this.branches = 32;
  }

  draw(context) {
    for (let i = 0; i < this.branches; i++) {
      context.save();
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      context.rotate((i * Math.PI * 2) / this.branches);
      this.#drawLine(context);
      context.restore();
    }
  }

  #drawLine(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.size, 0);
    context.stroke();
  }
}
