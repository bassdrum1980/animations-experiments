import { Particle } from "./particle";

export class Effect {
  constructor(width, height, context, image) {
    this.width = width;
    this.height = height;

    this.context = context;

    this.image = image;
    this.centerX = this.width / 2 - this.image.width / 2;
    this.centerY = this.height / 2 - this.image.height / 2;

    this.particles = [];
    this.particleSize = 6;

    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined,
    };

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  init() {
    this.context.drawImage(this.image, this.centerX, this.centerY);
    const pixels = this.context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;

    for (let y = 0; y < this.height; y += this.particleSize) {
      for (let x = 0; x < this.width; x += this.particleSize) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        if (alpha > 0) {
          this.particles.push(new Particle(this, x, y, rgba));
        }
      }
    }
  }

  //   draw() {
  //     this.particles.forEach((particle) => {
  //       particle.draw();
  //     });
  //   }

  draw() {
    // creates blank pixel buffer for the whole canvas
    const imageData = this.context.createImageData(this.width, this.height);

    this.particles.forEach((particle) => {
      const x = Math.round(particle.x);
      const y = Math.round(particle.y);

      // skip particle if out of bounds
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

      // parse RGBA string back to get numbers TODO: use a better way
      const match = particle.originRGBA.match(
        /rgba?\((\d+), (\d+), (\d+), (\d+)\)/
      );
      if (!match) return;
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const a = parseInt(match[4]);

      // get particle index in buffer
      const idx = (y * this.width + x) * 4;
      imageData.data[idx] = r;
      imageData.data[idx + 1] = g;
      imageData.data[idx + 2] = b;
      imageData.data[idx + 3] = a;
    });

    this.context.putImageData(imageData, 0, 0);
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  warp() {
    this.particles.forEach((particle) => {
      particle.warp();
    });
  }
}
