import AbsolutePosition from "./AbsolutePosition.mjs";

export default class Grid {
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
