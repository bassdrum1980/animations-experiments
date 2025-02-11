window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementsByClassName(
    "ui-button"
  )[0] as HTMLButtonElement;
  const input = document.getElementsByClassName(
    "ui-input"
  )[0] as HTMLInputElement;
  button.onclick = () => {
    input.classList.add("ui-input-invalid");
    input.addEventListener("animationend", () => {
      input.classList.remove("ui-input-invalid");
    });
  };
});
