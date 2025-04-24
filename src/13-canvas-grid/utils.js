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

    this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
    this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }
}

export class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.cellWidth = this.width / 66;
    this.cellHeight = this.height / 69;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    this.canvas.addEventListener("mouseleave", (e) => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        const cell = new Cell(this, x, y);
        this.imageGrid.push(cell);
      }
    }
  }
  render(context) {
    this.imageGrid.forEach((cell) => {
      cell.update();
      cell.draw(context);
    });
  }
}
