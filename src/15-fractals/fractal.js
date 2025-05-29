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
    this.size = this.canvasWidth / 12;
    this.branches = 96;
    this.maxDepth = 32;
  }

  draw(context) {
    context.save();
    context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    context.rotate(0);

    for (let i = 0; i < this.branches; i++) {
      this.#drawLine(context);
      context.rotate((Math.PI * 2) / this.branches);
    }

    context.restore();
  }

  #drawLine(context, depth = 0) {
    if (depth >= this.maxDepth) {
      return;
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.size, 0);
    context.stroke();

    context.save();
    context.translate(this.size, 0);
    context.rotate(Math.PI / 8);
    context.scale(0.9, 0.9);
    this.#drawLine(context, depth + 1);
    context.restore();
  }
}
