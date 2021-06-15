import Game from "./game-start/Game.mjs";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

const gameOverModal = document.getElementById("tryAgain");
const playAgainBtn = document.getElementById("playAgain");
const overlay = document.getElementById("overlay");

const game = new Game(GAME_HEIGHT, GAME_WIDTH);

playAgainBtn.addEventListener("click", function () {
  game.restart();
  gameOverModal.classList.add("hidden");
  overlay.classList.add("hidden");
});

function gameOver() {
  gameOverModal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  document.getElementById("score").textContent = game.score;
  document.getElementById("highscore").textContent = game.highscore;
}


function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  if (game.gameOver()) {
    gameOver();
  }
  game.update();
  game.draw(ctx);
}
setInterval(gameLoop, 100);
