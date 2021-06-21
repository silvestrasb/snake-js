/* NOTE: position directory */

class Grid {
  constructor(screenWidth, screenHeight, size) {
    this.size = size;
    this.rows = screenWidth / size;
    this.collums = screenHeight / size;
  }

  static getAbsoluteCoordinates(size, gridPosition) {
    return new AbsolutePosition(
      gridPosition.row * size,
      gridPosition.collumn * size
    );
  }
}

class AbsolutePosition {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class GridPosition {
  constructor(row, collumn) {
    this.row = row;
    this.collumn = collumn;
  }
}

/* NOTE: block directory */

class Block {
  /**
   * @param {string hex value} color
   */
  constructor(color, size, gridPosition) {
    this.color = color;
    this.size = size;
    this.gridPosition = gridPosition;
  }

  draw(ctx, size) {
    const absoluteCoordinates = Grid.getAbsoluteCoordinates(
      size,
      this.gridPosition
    );
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.fillRect(
      absoluteCoordinates.x,
      absoluteCoordinates.y,
      this.size,
      this.size
    );
    ctx.fill();
    ctx.closePath();
  }
}

class SnakeBlock extends Block {
  constructor(color, size, gridPosition) {
    super(color, size, gridPosition);
  }

  moveUp() {
    this.gridPosition = new GridPosition(
      this.gridPosition.row,
      this.gridPosition.collumn - 1
    );
  }

  moveDown() {
    this.gridPosition = new GridPosition(
      this.gridPosition.row,
      this.gridPosition.collumn + 1
    );
  }

  moveLeft() {
    this.gridPosition = new GridPosition(
      this.gridPosition.row - 1,
      this.gridPosition.collumn
    );
  }

  moveRight() {
    this.gridPosition = new GridPosition(
      this.gridPosition.row + 1,
      this.gridPosition.collumn
    );
  }
}

/* NOTE: control directory */

class UserInputs {
  constructor(snake) {
    this.pause = false;
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          snake.direction = "U";
          break;

        case "ArrowDown":
          snake.direction = "D";
          break;

        case "ArrowLeft":
          snake.direction = "L";
          break;

        case "ArrowRight":
          snake.direction = "R";
          break;

        case " ":
          this.pause = !this.pause;
          break;
      }
    });
  }
}

/* NOTE: entity directory */

class Apple extends Block {
  constructor(color, size, gridPosition) {
    super(color, size, gridPosition);
  }

  setRandomPosition(grid) {
    this.gridPosition = new GridPosition(
      Math.floor(Math.random() * grid.rows),
      Math.floor(Math.random() * grid.collums)
    );
  }
}

class Snake {
  /**
   * @param direction{
   * "U" - UP,
   * "D" - DOWN,
   * "L" - LEFT,
   * "R"- RIGHT
   * }
   */
  constructor(grid, direction, snakeBlocks) {
    this.grid = grid;
    this.direction = direction;
    this.snakeBlocks = snakeBlocks;
    this.head = this.snakeBlocks[0];
    this.tail = this.snakeBlocks[this.snakeBlocks.length - 1];
    this.lastDirection = direction;
  }

  move() {
    switch (this.direction) {
      case "U":
        this.moveUp();
        break;
      case "D":
        this.moveDown();
        break;
      case "L":
        this.moveLeft();
        break;
      case "R":
        this.moveRight();
        break;
    }
  }

  grow() {
    const tailBlock = new SnakeBlock(
      this.tail.color,
      this.tail.size,
      this.tail.gridPosition
    );

    this.snakeBlocks.push(tailBlock);
  }

  _shiftByOne(previousBlockPosition) {
    this.lastDirection = this.direction;
    for (let i = 1; i < this.snakeBlocks.length; i++) {
      const tempCurrentBlockPosition = this.snakeBlocks[i].gridPosition;
      this.snakeBlocks[i].gridPosition = previousBlockPosition;
      previousBlockPosition = tempCurrentBlockPosition;
    }
  }

  moveDown() {
    const previousBlockPosition = this.snakeBlocks[0].gridPosition;

    this.head.moveDown();

    this._shiftByOne(previousBlockPosition);

    this.direction = "D";
  }
  
  moveUp() {
    const previousBlockPosition = this.snakeBlocks[0].gridPosition;

    this.snakeBlocks[0].moveUp();

    this._shiftByOne(previousBlockPosition);

    this.direction = "U";
  }

  moveLeft() {
    const previousBlockPosition = this.snakeBlocks[0].gridPosition;

    this.snakeBlocks[0].moveLeft();

    this._shiftByOne(previousBlockPosition);

    this.direction = "L";
  }

  moveRight() {
    const previousBlockPosition = this.snakeBlocks[0].gridPosition;

    this.snakeBlocks[0].moveRight();

    this._shiftByOne(previousBlockPosition);

    this.direction = "R";
  }
}

/*  NOTE: colision-detection directory */

class CollisionDetection {

  static moveInTheOppositeDirection(lastDirection, currentDirection){
    if (lastDirection === "U" && currentDirection === "D") {
      return "U";
    } else if (lastDirection === "D" && currentDirection === "U") {
      return "D";
    } else if (lastDirection === "L" && currentDirection === "R") {
      return "L";
    } else if (lastDirection === "R" && currentDirection === "L") {
      return "R";
    }
    return currentDirection;

  }

  static snakeAteApple(snakeHead, applePosition) {
    if (JSON.stringify(applePosition) === JSON.stringify(snakeHead)) {
      return true;
    }
    return false;
  }

  static borderCollision(snakeHead, size, GAME_WIDTH, GAME_HEIGHT) {
    const absoluteCoordinates = Grid.getAbsoluteCoordinates(size, snakeHead);
    if (
      absoluteCoordinates.y < 0 ||
      absoluteCoordinates.y >= GAME_HEIGHT ||
      absoluteCoordinates.x < 0 ||
      absoluteCoordinates.x >= GAME_WIDTH
    ) {
      return true;
    }
    return false;
  }

  static snakeBitItself(snakeBlocks) {
    const valueArr = snakeBlocks.map(function (item) {
      return JSON.stringify(item.gridPosition);
    });
    const isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });
    return isDuplicate;
  }

  static appleUnderSnake(snakeBlocks, applePosition) {
    return snakeBlocks.some(function (item) {
      return (
        JSON.stringify(item.gridPosition) === JSON.stringify(applePosition)
      );
    });
  }
}

/* NOTE: game-start directory */

class Game {
  constructor(GAME_HEIGHT, GAME_WIDTH) {
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
    this.grid = new Grid(this.GAME_WIDTH, this.GAME_HEIGHT, 30);
    this.snake = new Snake(this.grid, "D", [
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

  /* DRAW ALL BLOCKS */
  draw(ctx) {
    this.apple.draw(ctx, this.grid.size);
    this.snake.snakeBlocks.forEach((block) => {
      block.draw(ctx, this.grid.size);
    });
    this.drawScore(ctx);
  }

  /* UPDATE GAME OBJECTS */
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
    this.snake = new Snake(this.grid, "D", [
      new SnakeBlock("#ffffff", this.grid.size, new GridPosition(6, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(5, 9)),
      new SnakeBlock("#90ee90", this.grid.size, new GridPosition(4, 9)),
    ]);
    this.ui = new UserInputs(this.snake);
    this.apple.setRandomPosition(this.grid);
    this.score = 0;
  }
}

/* NOTE: end of classes */

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
