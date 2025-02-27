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
