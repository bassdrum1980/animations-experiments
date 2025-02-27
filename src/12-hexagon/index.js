// Creates exagon grid
window.addEventListener("DOMContentLoaded", () => {
  const rows = 32;
  const cols = 48;
  const container = document.querySelector(".container");
  const fragment = new DocumentFragment();

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < cols; j++) {
      const hexagon = document.createElement("div");
      hexagon.classList.add("hexagon");
      row.append(hexagon);
    }

    fragment.append(row);
  }

  container.append(fragment);
});

// Follows cursor using Lerp technique
window.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector("#cursor");
  const rect = cursor.getBoundingClientRect();
  const dx = rect.width / 2;
  const dy = rect.height / 2;
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

    cursor.style.setProperty("--x", currentPosition.x);
    cursor.style.setProperty("--y", currentPosition.y);

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
