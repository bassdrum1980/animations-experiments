import { Effect } from "./effect";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const warpButton = document.getElementById("warpButton");
const assembleButton = document.getElementById("assembleButton");
const printButton = document.getElementById("printButton");

window.addEventListener("load", () => {
  const image = document.getElementById("sourceImage");

  const effect = new Effect(canvas.width, canvas.height, context, image);
  effect.init();
  effect.draw();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw();
    requestAnimationFrame(animate);
  }

  animate();

  warpButton.addEventListener("click", () => {
    effect.warp();
  });

  assembleButton.addEventListener("click", () => {
    effect.assemble();
  });

  printButton.addEventListener("click", () => {
    effect.print();
  });
});
