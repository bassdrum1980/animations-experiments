export class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = document.getElementById("image");
  }
  draw(context) {
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.cellWidth = this.width / 44;
    this.cellHeight = this.height / 46;
    this.imageGrid = [];
    this.createGrid();
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
      cell.draw(context);
    });
  }
}
