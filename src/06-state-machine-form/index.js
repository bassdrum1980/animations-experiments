const machine = {
  initial: "subscribe",
  state: {
    subscribe: {
      on: {
        CLICK: "subscribing",
      },
    },
    subscribing: {
      on: {
        CLICK: "subscribing",
        SUCCESS: "success",
        FAIL: "fail",
      },
    },
    success: {
      on: {
        CLICK: "subscribing",
      },
    },
    fail: {
      on: {
        CLICK: "subscribing",
      },
    },
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector(".ui-form");
  const buttonEl = document.querySelector(".ui-button");
  let timerId;

  // Subscribe to state changes
  formEl.addEventListener("stateChange", onStateChange);

  // Set initial state
  formEl.dispatchEvent(createStateEvent(machine.initial));

  // Button initiates state changes
  buttonEl.onclick = () => {
    const currentState = formEl.dataset.state;
    const nextState = machine.state[currentState].on.CLICK ?? currentState;

    formEl.dispatchEvent(createStateEvent(nextState));

    if (nextState === "subscribing") {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        formEl.dispatchEvent(
          createStateEvent(
            Math.random() > 0.5
              ? machine.state[nextState].on.SUCCESS
              : machine.state[nextState].on.FAIL
          )
        );
      }, 2000);
    }
  };

  function onStateChange(e) {
    // changes form state
    formEl.dataset.state = e.detail.state;

    // removes active state
    const elements = document.querySelectorAll("[data-show]");
    elements.forEach((el) => {
      el.removeAttribute("data-active");
    });

    // adds active state
    const el = document.querySelector(`[data-show="${e.detail.state}"]`);
    el.dataset.active = "true";
  }

  function createStateEvent(state) {
    return new CustomEvent("stateChange", { detail: { state } });
  }
});
