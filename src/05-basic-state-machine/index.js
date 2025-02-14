window.addEventListener("DOMContentLoaded", () => {
  const machine = {
    initial: "loading",
    state: {
      loading: {
        on: {
          CLICK: "success",
        },
      },
      success: {
        on: {
          CLICK: "loading",
        },
      },
    },
  };

  const appEl = document.querySelector("#app");
  const buttonEl = document.querySelector("button");

  buttonEl.onclick = () => {
    const currentState = appEl.dataset.state ?? machine.initial;
    const nextState = machine.state[currentState].on["CLICK"] ?? currentState;
    appEl.dataset.state = nextState;
  };
});
