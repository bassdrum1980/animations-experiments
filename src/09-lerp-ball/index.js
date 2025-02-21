const machine = {
  initial: "still",
  state: {
    still: {
      on: {
        CLICK: "pulse",
        DONE: "still",
      },
    },
    pulse: {
      on: {
        CLICK: "pulse",
        DONE: "still",
      },
    },
  },
};

// Lerp Technique
// https://rachsmith.com/lerp/
window.addEventListener("DOMContentLoaded", () => {
  const ball = document.getElementById("ball");
  const ballRect = ball.getBoundingClientRect();
  const dx = ballRect.width / 2;
  const dy = ballRect.height / 2;
  const currentPosition = { x: 0, y: 0 };
  const targetPosition = { x: 0, y: 0 };
  const lerpT = 0.1;
  let isAnimating = false;

  document.documentElement.onmousemove = (e) => {
    const { clientX: x, clientY: y } = e;
    targetPosition.x = x - dx;
    targetPosition.y = y - dy;

    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  };

  function animate() {
    currentPosition.x = lerp(currentPosition.x, targetPosition.x);
    currentPosition.y = lerp(currentPosition.y, targetPosition.y);

    ball.style.setProperty("--x", currentPosition.x);
    ball.style.setProperty("--y", currentPosition.y);

    if (
      Math.abs(currentPosition.x - targetPosition.x) < 1 &&
      Math.abs(currentPosition.y - targetPosition.y) < 1
    ) {
      isAnimating = false;
    } else {
      requestAnimationFrame(animate);
    }
  }

  // linear interpolation function
  function lerp(start, end) {
    return start + (end - start) * lerpT;
  }
});
