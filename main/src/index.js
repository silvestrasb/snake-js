import Apple from "/src/cl-apple.js";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
// ctx.fillRect(0, 0, 100, 100);
const appleTest = new Apple(600, 600, 10);
appleTest.draw(ctx);