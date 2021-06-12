import Apple from "../blocks/Apple.mjs";
import GridPosition from "../positioning/GridPosition.mjs";
import SnakeBlock from "../blocks/SnakeBlock.mjs";
import DynamicSnake from "../game_logic/DynamicSnake.mjs";
import Grid from "../positioning/Grid.mjs";
import CollisionDetection from "../colision_logic/CollisionDetection.mjs";
import UserInputs from "../controls/UserInputs.mjs";

export default class Game {
  constructor(GAME_HEIGHT, GAME_WIDTH) {
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
    this.grid = new Grid(this.GAME_WIDTH, this.GAME_HEIGHT, 30);
    this.snake = new DynamicSnake(this.grid, "D", [
      new SnakeBlock("#ffffff", this.grid.size, new GridPosition(6, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(5, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(4, 9)),
    ]);
    this.apple = new Apple("#961e11", this.grid.size, new GridPosition(3, 5));
    this.apple.setRandomPosition(this.grid);
    this.ui = new UserInputs(this.snake);
    this.score = 0;
    this.highscore = 0;
  }

  /* DRAW THE SCORE */
  drawScore(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.score, 8, 20);
  }

  /* GAME ENDING CONDITIONS */
  gameOver() {
    if (
      CollisionDetection.snakeBitItself(this.snake.snakeBlocks) ||
      CollisionDetection.borderCollision(
        this.snake.head.gridPosition,
        this.grid.size,
        this.GAME_WIDTH,
        this.GAME_HEIGHT
      )
    ) {
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      return true;
    }
    return false;
  }

  /* GAMEPLAY CONDITIONS */
  conditions() {
    if (
      CollisionDetection.snakeAteApple(
        this.snake.head.gridPosition,
        this.apple.gridPosition
      )
    ) {
      this.snake.grow();
      this.apple.setRandomPosition(this.grid);
      this.score++;
    } else if (
      CollisionDetection.appleUnderSnake(
        this.snake.snakeBlocks,
        this.apple.gridPosition
      )
    ) {
      while (
        CollisionDetection.appleUnderSnake(
          this.snake.snakeBlocks,
          this.apple.gridPosition
        )
      ) {
        this.apple.setRandomPosition(this.grid);
      }
    }
  }

  /* DRAW ALL BLOCKS draw() */
  draw(ctx) {
    this.apple.draw(ctx, this.grid.size);
    this.snake.snakeBlocks.forEach((block) => {
      block.draw(ctx, this.grid.size);
    });
    this.drawScore(ctx);
  }

  /* UPDATES THE GAME'S OBJECTS */
  update() {
    if (!this.ui.pause && !this.gameOver()) {
      this.snake.direction = CollisionDetection.moveInTheOppositeDirection(
        this.snake.lastDirection,
        this.snake.direction
      );
      this.conditions();
      this.snake.move();
    }
  }

  /* RESTART THE GAME */
  restart() {
    this.snake = new DynamicSnake(this.grid, "D", [
      new SnakeBlock("#ffffff", this.grid.size, new GridPosition(6, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(5, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(4, 9)),
    ]);
    this.ui = new UserInputs(this.snake);
    this.apple.setRandomPosition(this.grid);
    this.score = 0;
  }
}
