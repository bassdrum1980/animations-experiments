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

    this.vx = 0;
    this.vy = 0;
    this.friction = 0.8;
    this.ease = Math.random() * 0.05 + 0.03;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;

    this.active = true;
    this.timeoutId = null;
  }

  draw() {
    this.effect.context.fillStyle = this.originRGBA;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    if (this.active) {
      this.dx = this.effect.mouse.x - this.x;
      this.dy = this.effect.mouse.y - this.y;
      // square root is expensive
      // instead of square root we use larger this.effect.mouse.radius inside the effect
      this.distance = this.dx * this.dx + this.dy * this.dy;
      // the closer the particle to the mouse, the stronger the force
      // minus - because we want to move the particles away from the mouse
      this.force = -this.effect.mouse.radius / this.distance;
      // Math.random() > 0.7 lets some particles to get inside the mouse radius
      // thus making the effect more natural
      if (this.distance < this.effect.mouse.radius && Math.random() > 0.7) {
        // returns 'theta' angle in radians
        // accepts 'dy' first
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x +=
        (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
      this.y +=
        (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    }
  }

  warp() {
    this.ease = Math.random() * 0.05 + 0.1;
    this.x =
      Math.random() * this.effect.width * 4 * (Math.random() > 0.5 ? 1 : -1);
    this.y =
      Math.random() * this.effect.height * 4 * (Math.random() > 0.5 ? 1 : -1);
  }

  assemble() {
    clearTimeout(this.timeoutId);

    this.ease = Math.random() * 0.05 + 0.1;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.active = false;

    this.effect.counter++;

    this.timeoutId = setTimeout(() => {
      this.active = true;
    }, this.effect.counter / 8);
  }
}
