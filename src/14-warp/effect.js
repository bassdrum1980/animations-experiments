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
    this.particleCount = 100;
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this));
    }
  }

  draw() {
    this.particles.forEach((particle) => {
      particle.draw();
    });
    this.context.drawImage(this.image, this.centerX, this.centerY);
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }
}
