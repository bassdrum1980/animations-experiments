const machine = {
  initial: "collapsed",
  state: {
    collapsed: {
      on: {
        CLICK: "expanded",
      },
    },
    expanded: {
      on: {
        CLICK: "collapsed",
      },
    },
  },
};

// FLIP Technique
// https://aerotwist.com/blog/flip-your-animations/

window.addEventListener("DOMContentLoaded", () => {
  const appEl = document.getElementById("app");
  const card = document.querySelector(".card");

  appEl.onclick = () => {
    const currentState = appEl.dataset.state ?? machine.initial;
    const nextState = machine.state[currentState].on["CLICK"] ?? currentState;

    // First
    const { width: widthBefore, height: heightBefore } =
      card.getBoundingClientRect();

    // setting the next state
    appEl.dataset.state = nextState;

    requestAnimationFrame(() => {
      // Last
      const { width: widthAfter, height: heightAfter } =
        card.getBoundingClientRect();
      const scaleX = widthBefore / widthAfter;
      const scaleY = heightBefore / heightAfter;

      // Invert
      card.style.setProperty("--scaleX", scaleX);
      card.style.setProperty("--scaleY", scaleY);

      // Invert with CSS
      card.dataset.flip = "invert";

      // Play with CSS
      requestAnimationFrame(() => {
        card.dataset.flip = "play";
      });

      // Invert / Play with Web Animations API
      // also need to remove transitions from CSS in style.scss in this case
      // card.animate(
      //   [
      //     {
      //       transform: `scale(${scaleX}, ${scaleY})`,
      //     },
      //     {
      //       transform: "scale(1, 1)",
      //     },
      //   ],
      //   {
      //     duration: 1500,
      //     easing: "ease-in-out",
      //   }
      // );
    });
  };
});
