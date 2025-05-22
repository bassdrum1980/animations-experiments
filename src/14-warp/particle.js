export class Particle {
  constructor(effect, originX, originY, originRGBA) {
    this.effect = effect;

    this.x =
      Math.random() * this.effect.width * 4 * (Math.random() > 0.5 ? 1 : -1);
    this.y =
      Math.random() * this.effect.height * 4 * (Math.random() > 0.5 ? 1 : -1);
    this.size = this.effect.particleSize;

    this.originX = Math.floor(originX);
    this.originY = Math.floor(originY);
    this.originRGBA = originRGBA;

    // this.vx = 0;
    // this.vy = 0;
    this.ease = Math.random() * 0.05 + 0.03;
  }

  draw() {
    this.effect.context.fillStyle = this.originRGBA;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}
