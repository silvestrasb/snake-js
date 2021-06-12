export default class UserInputs {
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
