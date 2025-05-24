import { Particle } from "./particle";

export class Effect {
  constructor(width, height, context, image) {
    this.width = width;
    this.height = height;

    this.context = context;

    this.image = image;
    this.centerX = this.width / 2 - this.image.width / 2;
    this.centerY = this.height / 2 - this.image.height / 2;

    this.particles = [];
    this.particleSize = 2;

    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined,
    };

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });

    this.counter = 0;
  }

  init() {
    this.context.drawImage(this.image, this.centerX, this.centerY);
    const pixels = this.context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;

    for (let y = 0; y < this.height; y += this.particleSize) {
      for (let x = 0; x < this.width; x += this.particleSize) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        if (alpha > 0) {
          this.particles.push(new Particle(this, x, y, rgba));
        }
      }
    }
  }

  draw() {
    this.particles.forEach((particle) => {
      particle.draw();
    });
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  warp() {
    this.particles.forEach((particle) => {
      particle.warp();
    });
  }

  assemble() {
    this.counter = 0;

    this.particles.forEach((particle) => {
      particle.assemble();
    });
  }

  print() {
    this.counter = 0;

    this.particles.forEach((particle) => {
      particle.print();
    });
  }
}
