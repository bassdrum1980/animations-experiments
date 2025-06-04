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
    this.sides = 15;
    this.maxDepth = 3;
    this.scale = 0.6;
    this.spread = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
    this.branches = 2;

    this.bezierXoffset = this.size / 8;
    this.bezierYoffset = this.size / 8;
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

    // Draw the circle at the end of the branch
    this.#drawCircle(context, this.size, 0, Math.random() * 40);

    context.save();
    // Draw the first bezier curve
    context.scale(0.7, 0.7);
    this.#drawBezierCurve(
      context,
      256 + this.bezierXoffset,
      302 + this.bezierYoffset,
      281 + this.bezierXoffset,
      289 + this.bezierYoffset,
      365 + this.bezierXoffset,
      233 + this.bezierYoffset
    );
    context.restore();

    // Draw the second bezier curve
    this.#drawBezierCurve(
      context,
      235 + this.bezierXoffset,
      180 + this.bezierYoffset,
      276 + this.bezierXoffset,
      211 + this.bezierYoffset,
      273 + this.bezierXoffset,
      346 + this.bezierYoffset
    );

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

  #drawCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();
  }
  #drawBezierCurve(context, x1, y1, x2, y2, x3, y3) {
    // bezierCurveTo GUI generator
    // https://www.victoriakirst.com/beziertool/
    context.beginPath();
    context.moveTo(109 + this.bezierXoffset, 124 + this.bezierYoffset);
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    context.stroke();
  }
}
