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
  constructor(canvasWidth, canvasHeight, color) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.color = color || "hsl(0, 0%, 100%)";
    this.size = this.canvasWidth / 4;
    this.sides = 48;
    this.maxDepth = 3;
    this.scale = 0.7;
    this.spread = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
    this.branches = 2;
  }

  draw(context) {
    context.lineWidth = 6;
    context.lineCap = "round";
    context.shadowColor = "rgba(0, 0, 0, .25)";
    context.shadowBlur = 12;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

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

    context.beginPath();
    context.arc(this.size, 0, Math.random() * 40, 0, Math.PI * 2);
    context.stroke();

    for (let i = 0; i < this.branches; i++) {
      context.save();

      context.translate(this.size - (this.size / this.branches) * i, 0);
      context.scale(this.scale, this.scale);

      context.save();
      context.rotate(this.spread);
      this.#drawLine(context, depth + 1);
      context.restore();

      // context.save();
      // context.rotate(-this.spread);
      // this.#drawLine(context, depth + 1);
      // context.restore();

      context.restore();
    }
  }
}
