import SnakeBlock from "../block/SnakeBlock.mjs";

export default class Snake {
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
