export default class Apple {
  constructor(screenHeigh, screenWidth, appleRadius) {
    this.screenHeigh = screenHeigh;
    this.screenWidth = screenWidth;
    this.appleRadius = appleRadius;

    this.position = {
      x: 0,
      y: 0,
    };
  }

  draw(ctx) {
    const x = Math.floor(
      Math.random() * (this.screenWidth - this.appleRadius * 2 + 1) +
        this.appleRadius
    );
    const y = Math.floor(
      Math.random() * (this.screenHeigh - this.appleRadius * 2 + 1) +
        this.appleRadius
    );

    // Draws the apple on the screen within boundaries
    ctx.arc(x, y, this.appleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#961e11";
    ctx.fill();

    // updates x and y coordinates of the apple
    this.position.x = x;
    this.position.y = y;
  }

  getCoordinates() {
    return this.position;
  }
}
