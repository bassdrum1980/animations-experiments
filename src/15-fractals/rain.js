import { Particle } from "./particle";

export class Rain {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.numberOfParticles = 20;
    this.particles = [];

    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this.canvasWidth, this.canvasHeight));
    }
  }

  run(context) {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(context);
    });
  }
}
