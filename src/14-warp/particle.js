export class Particle {
  constructor(effect, originX, originY, originRGBA) {
    this.effect = effect;

    this.x = originX;
    this.y = originY;
    this.size = Math.random() * this.effect.particleSize + 1;

    this.originX = Math.floor(originX);
    this.originY = Math.floor(originY);
    this.originRGBA = originRGBA;

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  draw() {
    this.effect.context.fillStyle = this.originRGBA;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
