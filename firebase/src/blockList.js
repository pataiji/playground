const $ = require("jquery");

export default class BlockList {
  constructor() {
    this.container = $("#block-container");
    this.gridSize = 7;
    this.positions = this._calculatePositions();
  }

  render() {
    for (let i = 0; i < this.gridSize; i++) {
      const row = $('<div class="row">');
      for (let j = 0; j < this.gridSize; j++) {
        row.append($('<div class="block">'));
      }
      this.container.append(row);
    }
  }

  clear() {
    this.container.find(".block").css({ opacity: 0 });
  }

  fill(i) {
    const position = this.targetPosition(i);
    this.container
      .find(
        ".row:nth-child(" +
          (position[1] + 1) +
          ") .block:nth-child(" +
          (position[0] + 1) +
          ")"
      )
      .css({ opacity: 1 });
    return this.positions.length - 1 - i;
  }

  targetPosition(i) {
    return this.positions[i];
  }

  nextPositionExist(positions, next_x, next_y) {
    return positions.some(function(elm) {
      return elm[0] === next_x && elm[1] === next_y;
    });
  }

  _calculatePositions() {
    const positions = [];
    let x = 0;
    let y = 0;
    let x_direction = 1;
    let y_direction = 0;
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      positions[i] = [x, y];
      if (
        x >= this.gridSize - 1 ||
        this.nextPositionExist(positions, x + x_direction, y + y_direction)
      ) {
        x_direction = 0;
        y_direction = 1;
      }
      if (
        y >= this.gridSize - 1 ||
        this.nextPositionExist(positions, x + x_direction, y + y_direction)
      ) {
        x_direction = -1;
        y_direction = 0;
      }
      if (
        x + x_direction < 0 ||
        this.nextPositionExist(positions, x + x_direction, y + y_direction)
      ) {
        x_direction = 0;
        y_direction = -1;
      }
      if (
        y + y_direction < 0 ||
        this.nextPositionExist(positions, x + x_direction, y + y_direction)
      ) {
        x_direction = 1;
        y_direction = 0;
      }

      x = x + x_direction;
      y = y + y_direction;
    }
    return positions;
  }
}
