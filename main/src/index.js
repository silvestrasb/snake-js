import Apple from "./blocks/Apple.mjs";
import Grid from "./positioning/Grid.mjs";
import SnakeBlock from "./blocks/SnakeBlock.mjs";
import UserInputs from "./controls/UserInputs.mjs";
import GridPosition from "./positioning/GridPosition.mjs";
import DynamicSnake from "./game_logic/DynamicSnake.mjs";
import Game from "./game_init/Game.mjs";
import CollisionDetection from "./colision_logic/CollisionDetection.mjs";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

const gameOverModal = document.getElementById("tryAgain");
const playAgainBtn = document.getElementById("playAgain");
const overlay = document.getElementById("overlay");

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

const game = new Game(GAME_HEIGHT, GAME_WIDTH);

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  if (game.gameOver()) {
    gameOver();
  }
  game.draw(ctx);
  game.update();
}
setInterval(gameLoop, 100);
