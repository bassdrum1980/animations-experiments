import { Particle } from "./particle";

export class Rain {
  constructor(canvasWidth, canvasHeight, image) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.numberOfParticles = 20;
    this.particles = [];
    this.image = image;

    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(
        new Particle(this.canvasWidth, this.canvasHeight, this.image)
      );
    }
  }

  run(context) {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(context);
    });
  }
}
