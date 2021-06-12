import Block from "./Block.mjs";
import GridPosition from "/src/positioning/GridPosition.mjs";

export default class SnakeBlock extends Block {
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
