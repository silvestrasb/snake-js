import Block from "./Block.mjs";
import GridPosition from "../positioning/GridPosition.mjs";

export default class Apple extends Block {
  constructor(color, size, gridPosition) {
    super(color, size, gridPosition);
  }

  setRandomPosition(grid) {
    this.gridPosition = new GridPosition(Math.floor(Math.random() * grid.rows), Math.floor(Math.random() * grid.collums));
  }
}
