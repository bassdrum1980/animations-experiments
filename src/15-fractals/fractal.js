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
    this.sides = 13;
    this.maxDepth = 3;
    this.scale = 0.6;
    this.spread = Math.PI / 4;
    this.branches = 3;
    this.color = "hsl(200, 100%, 50%)";
  }

  draw(context) {
    context.strokeStyle = this.color;
    context.save();
    context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    context.scale(1, 1);
    context.rotate(0);

    for (let i = 0; i < this.sides; i++) {
      this.#drawLine(context, 0);
      context.rotate((Math.PI * 2) / this.sides);
    }

    context.restore();
  }

  #drawLine(context, depth = 0) {
    if (depth > this.maxDepth) {
      return;
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.size, 0);
    context.stroke();

    for (let i = 0; i < this.branches; i++) {
      context.save();

      context.translate(this.size - (this.size / this.branches) * i, 0);
      context.scale(this.scale, this.scale);

      context.save();
      context.rotate(this.spread);
      this.#drawLine(context, depth + 1);
      context.restore();

      context.save();
      context.rotate(-this.spread);
      this.#drawLine(context, depth + 1);
      context.restore();

      context.restore();
    }
  }
}
