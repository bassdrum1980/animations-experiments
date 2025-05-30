import { Fractal } from "./fractal.js";
import { Rain } from "./rain.js";
import { getComplementaryHSL } from "../utils/color.js";

/* Setting Colors */
const primaryHue = Math.random() * 360;
const primarySaturation = 100;
const primaryLightness = 50;
const primaryColor = `hsl(${primaryHue}, ${primarySaturation}%, ${primaryLightness}%)`;
const primaryComplimentaryColor = getComplementaryHSL(
  primaryHue,
  primarySaturation - 60,
  primaryLightness + 45
);
document.body.style.backgroundColor = primaryComplimentaryColor;

/* Setting Fractal canvas */
const canvasFractal = document.getElementById("canvasFractal");
const contextFractal = canvasFractal.getContext("2d");
canvasFractal.width = 300;
canvasFractal.height = 300;

/* Setting Rain canvas */
const canvasRain = document.getElementById("canvasRain");
const contextRain = canvasRain.getContext("2d");
canvasRain.width = window.innerWidth;
canvasRain.height = window.innerHeight;

const fractal = new Fractal(
  canvasFractal.width,
  canvasFractal.height,
  primaryColor
);
fractal.draw(contextFractal);

// Create a new image from the fractal canvas
const fractalImage = new Image();
fractalImage.src = canvasFractal.toDataURL("image/png");
fractalImage.onload = () => {
  const rainEffect = new Rain(
    canvasRain.width,
    canvasRain.height,
    fractalImage
  );
  function animate() {
    contextRain.clearRect(0, 0, canvasRain.width, canvasRain.height);
    rainEffect.run(contextRain);
    requestAnimationFrame(animate);
  }
  animate();
};
