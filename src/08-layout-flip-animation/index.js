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
  const figure = document.querySelector(".ui-figure");
  const caption = document.querySelector(".ui-caption");

  appEl.onclick = () => {
    flip(() => {
      const currentState = appEl.dataset.state ?? machine.initial;
      const nextState = machine.state[currentState].on["CLICK"] ?? currentState;
      appEl.dataset.state = nextState;
    }, [figure, caption]);
  };

  function flip(fn, elements) {
    // First
    const before = elements.map((el) => el.getBoundingClientRect());

    fn();

    requestAnimationFrame(() => {
      // Last
      const after = elements.map((el) => el.getBoundingClientRect());

      elements.forEach((el, i) => {
        const dx = before[i].left - after[i].left;
        const dy = before[i].top - after[i].top;
        const dw = before[i].width / after[i].width;
        const dh = before[i].height / after[i].height;

        el.style.setProperty("--dx", dx);
        el.style.setProperty("--dy", dy);
        el.style.setProperty("--dw", dw);
        el.style.setProperty("--dh", dh);

        // Invert
        el.dataset.flip = "invert";
      });

      // Play
      requestAnimationFrame(() => {
        elements.forEach((el) => {
          el.dataset.flip = "play";
        });
      });
    });
  }
});
