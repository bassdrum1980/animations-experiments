let lastUpdateTime = 0;
const updateInterval = 3000;

window.addEventListener("DOMContentLoaded", () => {
  initBalls();
  requestAnimationFrame(updateBalls);
});

function initBalls() {
  const gridsize = 32;
  const grid = document.querySelector(".grid");
  const fragment = new DocumentFragment();

  // set grid size
  grid.style.setProperty("--gridsize", gridsize);

  for (let i = 1; i <= Math.pow(gridsize, 2); i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");

    // set index
    ball.style.setProperty("--i", i);

    // set random delay
    ball.style.setProperty("--delay", Math.random() * 0.5);

    // set color
    setBallColor(ball);

    fragment.append(ball);
  }

  grid.append(fragment);
}

function updateBalls() {
  const now = performance.now();

  if (now - lastUpdateTime >= updateInterval) {
    const balls = Array.from(document.querySelectorAll(".ball"));
    balls.map((ball) => {
      setBallColor(ball);
    });
    lastUpdateTime = now;
  }

  requestAnimationFrame(updateBalls);
}

function setBallColor(ball) {
  ball.style.setProperty("--color", Math.random() > 0.5 ? "purple" : "black");
  return;
}
