import { Effect } from "./effect";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("load", () => {
  const image = document.getElementById("sourceImage");

  const effect = new Effect(canvas.width, canvas.height, context, image);
  effect.init();
  effect.draw();

  function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw();
    requestAnimationFrame(animate);
  }

  animate();

  console.log(effect);
});
