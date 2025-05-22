export class Cell {
  constructor(effect, x, y, i) {
    this.effect = effect;
    this.image = document.getElementById("image");
    this.index = i;

    // these four define cell position
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;

    // these four define image cropping area
    this.slideX = null;
    this.slideY = null;
    this.vx = 0;
    this.vy = 0;

    // -- Moving cell --
    // these two define cell position while moving
    // starting position is the center of the canvas
    this.positionX = this.effect.width / 2;
    this.positionY = this.effect.height / 2;
    // these two define cell horizontal and vertical speed
    this.speedX;
    this.speedY;

    this.randomize = Math.random() * 20 + 2;
    this.ease = 0.01;
    this.friction = 0.8;

    setTimeout(() => {
      this.start();
    }, this.index);
  }
  draw(context) {
    //context.strokeRect(this.positionX, this.positionY, this.width, this.height);

    context.drawImage(
      this.image,

      // cropping area (in image context)
      this.x + this.slideX,
      this.y + this.slideY,
      this.width,
      this.height,

      // cell position (in canvas context)
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
  // because of the condition below we need to initialize
  // speedX and speedY in the constructor
  start() {
    this.speedX = (this.x - this.positionX) / this.randomize;
    this.speedY = (this.y - this.positionY) / this.randomize;
  }
  update() {
    // cell position
    // condition stops movement calculations when the cell is in place
    if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) {
      this.speedX = (this.x - this.positionX) / this.randomize;
      this.speedY = (this.y - this.positionY) / this.randomize;
      this.positionX += this.speedX;
      this.positionY += this.speedY;
    }

    // crop
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < this.effect.mouse.radius) {
      const force = distance / this.effect.mouse.radius;
      // angle in radians
      const angle = Math.atan2(dy, dx);
      this.vx = force * Math.cos(angle); // cosinus gives us x
      this.vy = force * Math.sin(angle); // sinus gives us y
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
