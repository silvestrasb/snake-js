import Grid from "/src/positioning/Grid.mjs";

export default class Block {
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
