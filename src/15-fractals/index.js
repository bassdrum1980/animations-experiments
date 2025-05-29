import { Fractal } from "./fractal.js";
import { Rain } from "./rain.js";

/* Setting Fractal canvas */
const canvasFractal = document.getElementById("canvasFractal");
const contextFractal = canvasFractal.getContext("2d");
canvasFractal.width = window.innerWidth;
canvasFractal.height = window.innerHeight;

const fractal = new Fractal(canvasFractal.width, canvasFractal.height);
fractal.draw(contextFractal);

/* Setting Rain canvas */
const canvasRain = document.getElementById("canvasRain");
const contextRain = canvasRain.getContext("2d");
canvasRain.width = window.innerWidth;
canvasRain.height = window.innerHeight;

const rainEffect = new Rain(canvasRain.width, canvasRain.height);
function animate() {
  contextRain.clearRect(0, 0, canvasRain.width, canvasRain.height);
  rainEffect.run(contextRain);
  requestAnimationFrame(animate);
}
//animate();
