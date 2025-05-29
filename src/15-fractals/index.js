import { Fractal } from "./fractal.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas settings
context.lineWidth = 20;
context.lineCap = "round";

const fractal = new Fractal(canvas.width, canvas.height);
fractal.draw(context);
