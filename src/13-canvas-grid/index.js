import { Effect } from "./utils.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 660;
canvas.height = 690;

const effect = new Effect(canvas);
effect.render(ctx);
