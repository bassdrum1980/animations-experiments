export class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.size = 3;
    this.vx = Math.random() * 10;
    this.vy = 1;
  }

  draw() {
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
