import Grid from "/src/positioning/Grid.mjs";
export default class CollisionDetection {

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
