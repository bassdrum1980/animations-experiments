export class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = document.getElementById("image");
    this.slideX = null;
    this.slideY = null;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.01;
    this.friction = 0.8;
  }
  draw(context) {
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.slideX,
      this.y + this.slideY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius) {
      const force = distance / this.effect.mouse.radius;
      const angle = Math.atan2(dy, dx);
      this.vx = force * Math.cos(angle);
      this.vy = force * Math.sin(angle);
    }

    // this.vx *= this.friction - a force that pushes cells away from the mouse
    // friction is a coefficient that slows down the force
    //
    // this.slideX * this.ease - a force that pulls cells back to their original position
    // when cell aren't in the mouse's active area
    // this.ease is a coefficient that slows down the pull back
    this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
    this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }
}
