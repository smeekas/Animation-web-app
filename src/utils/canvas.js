import store from "../store";
import { canvasDimension, dimension } from "../variables";
const CANVASH = canvasDimension;

const CANVASW = canvasDimension;
class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.cellH = CANVASH / columns;
    this.cellW = CANVASW / rows;
    this.color = "red";
    this.fill = "blue";
    this.grid = [];
    this.prevColorOfLine = [];
    this.prevColorOfLine2 = [];
    this.prevColorOfCircle = [];
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < columns; j++) {
        this.grid[i].push("#ffffff");
      }
    }
  }

  //!LINE
  initLine(cX, cY, left, top) {
    [this.lineY, this.lineX] = this.getPixel(cX, cY, left, top);
    this.prevColorOfLine2 = [];
  }
  drawLine(cX, cY, left, top) {
    let [endY, endX] = this.getPixel(cX, cY, left, top);
    this.lineAlgorithm(this.lineX, this.lineY, endX, endY);
  }
  finishLine(cX, cY, left, top) {
    let [endY, endX] = this.getPixel(cX, cY, left, top);
    this.lineAlgorithm(this.lineX, this.lineY, endX, endY);
    this.lineX = null;
    this.lineY = null;
    this.prevColorOfLine = [];
    this.prevColorOfLine2 = [];
  }
  lineAlgorithm(x1, y1, x2, y2) {
    let pixelarr = [];

    // Iterators, counters required by algorit
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i; // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1; // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy); // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1; // The line is X-axis dominant
    if (dy1 <= dx1) {
      // Line is drawn left to right
      if (dx >= 0) {
        x = x1;
        y = y1;
        xe = x2;
      } else {
        // Line is drawn right to left (swap ends)
        x = x2;
        y = y2;
        xe = x1;
      }
      pixelarr.push({ x: x, y: y });

     
      for (i = 0; x < xe; i++) {
        x = x + 1; // Deal with octants...
        if (px < 0) {
          px = px + 2 * dy1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            y = y + 1;
          } else {
            y = y - 1;
          }
          px = px + 2 * (dy1 - dx1);
        } // Draw pixel from line span at
        // currently rasterized position
      
        pixelarr.push({ x: x, y: y });

      }
    } else {
      // The line is Y-axis dominant        // Line is drawn bottom to top
      if (dy >= 0) {
        x = x1;
        y = y1;
        ye = y2;
      } else {
        // Line is drawn top to bottom
        x = x2;
        y = y2;
        ye = y1;
      }
   
      pixelarr.push({ x: x, y: y });

      for (i = 0; y < ye; i++) {
        y = y + 1; // Deal with octants...
        if (py <= 0) {
          py = py + 2 * dx1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            x = x + 1;
          } else {
            x = x - 1;
          }
          py = py + 2 * (dx1 - dy1);
        } // Draw pixel from line span at
        // currently rasterized position
      
        pixelarr.push({ x: x, y: y });
      }
    }
    this.colorLineGrid(pixelarr);
  }
  cancelLine() {
    this.prevColorOfLine.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    if (store.getState().canvas.mirror) {
      this.prevColorOfLine2.forEach((item) => {
        this.grid[item.x][item.y] = item.color;
      });
    }
    this.drawGrid();
  }
  colorLineGrid(arr) {
    //color prev

    this.prevColorOfLine.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    if (store.getState().canvas.mirror) {
      this.prevColorOfLine2.forEach((item) => {
        this.grid[item.x][item.y] = item.color;
      });
    }
    //color new
    this.prevColorOfLine = [];
    this.prevColorOfLine2 = [];

    arr.forEach((item) => {
      this.prevColorOfLine.push({
        x: item.x,
        y: item.y,
        color: this.grid[item.x][item.y],
      });
      if (store.getState().canvas.mirror) {
        if (
          !this.prevColorOfLine.some(
            (points) =>
              points.x === item.x && points.y === this.columns - 1 - item.y
          )
        ) {
          this.prevColorOfLine2.push({
            x: item.x,
            y: this.columns - 1 - item.y,
            color: this.grid[item.x][this.columns - 1 - item.y],
          });
        }
      }   
      this.grid[item.x][item.y] = this.getColor();
      if (store.getState().canvas.mirror) {
        if (item.y !== this.columns - 1 - item.y) {
          this.grid[item.x][this.columns - 1 - item.y] = this.getColor();
        }
      }
    });
    this.drawGrid();
    //add new to prev
  }
  //!LINE FINISHED
  //!RECTANGLE
  initRect(cX, cY, left, top) {
    [this.rectY, this.rectX] = this.getPixel(cX, cY, left, top);
  }
  drawRect(cX, cY, left, top) {
    let [endY, endX] = this.getPixel(cX, cY, left, top);
    let cordX4 = this.rectX,
      cordY4 = endY;
    this.rectArr = [];
    if (this.rectX <= endX && this.rectY <= endY) {
      for (let i = this.rectX; i <= endX; i++) {
        this.rectArr.push({
          x: i,
          y: this.rectY,
        });
        this.rectArr.push({
          x: i,
          y: cordY4,
        });
      }
      for (let i = this.rectY + 1; i < endY; i++) {
        this.rectArr.push({
          x: this.rectX,
          y: i,
        });
        this.rectArr.push({
          x: endX,
          y: i,
        });
      }
 
    } else if (this.rectX <= endX && this.rectY >= endY) {
     
      for (let i = cordX4; i <= endX; i++) {
        this.rectArr.push({
          x: i,
          y: this.rectY,
        });
        this.rectArr.push({
          x: i,
          y: cordY4,
        });
      }
      for (let i = cordY4 + 1; i < this.rectY; i++) {
        this.rectArr.push({
          x: this.rectX,
          y: i,
        });
        this.rectArr.push({
          x: endX,
          y: i,
        });
      }
    } else if (this.rectX > endX && this.rectY < endY) {
     
      for (let i = endX; i <= this.rectX; i++) {
        //!here is problem
        this.rectArr.push({
          x: i,
          y: endY,
        });
        this.rectArr.push({
          x: i,
          y: this.rectY,
        });
      }
      for (let i = this.rectY + 1; i < endY; i++) {
        this.rectArr.push({
          x: this.rectX,
          y: i,
        });
        this.rectArr.push({
          x: endX,
          y: i,
        });
      }
    } else {
     
      for (let i = endX; i <= this.rectX; i++) {
        //!here is problem
        this.rectArr.push({
          x: i,
          y: endY,
        });
        this.rectArr.push({
          x: i,
          y: this.rectY,
        });
      }
      for (let i = endY + 1; i < this.rectY; i++) {
        this.rectArr.push({
          x: this.rectX,
          y: i,
        });
        this.rectArr.push({
          x: endX,
          y: i,
        });
      }
    }
    this.colorCircleGrid(this.rectArr);
  }
  finishRect(cX, cY, left, top) {
    this.drawRect(cX, cY, left, top);
    this.rectX = this.rectY = null;
    this.prevColorOfCircle = [];
  }
  cancelRect() {
    this.prevColorOfCircle.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    this.prevColorOfCircle = [];
    this.drawGrid();
  }
  //!RECTANGLE FINISH
  //! CIRCLE

  initCircle(cX, cY, left, top) {
    [this.circleX, this.circleY] = this.getPixel(cX, cY, left, top);
  }
  getRadiusAndCenter(endX, endY) {
    const rx = Math.abs(this.circleX - endX);
    const ry = Math.abs(this.circleY - endY);
    const min = rx > ry ? ry : rx;
    const cx = Math.floor(min / 2) + this.circleX;
    const cy = Math.floor(min / 2) + this.circleY;
    return [cx, cy, Math.floor(min / 2)];
  }

  drawCircle(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.circleAlgorithm(...this.getRadiusAndCenter(endX, endY));
  }

  circleAlgorithm(x0, y0, radius) {
    let pixelArr = [];
   
    var x = radius;
    var y = 0;
    var radiusError = 1 - x;

    while (x >= y) {
      pixelArr.push({ x: x + x0, y: y + y0 });
      pixelArr.push({ x: y + x0, y: x + y0 });
      pixelArr.push({ x: -x + x0, y: y + y0 });
      pixelArr.push({ x: -y + x0, y: x + y0 });
      pixelArr.push({ x: -x + x0, y: -y + y0 });
      pixelArr.push({ x: -y + x0, y: -x + y0 });
      pixelArr.push({ x: x + x0, y: -y + y0 });
      pixelArr.push({ x: y + x0, y: -x + y0 });
      y++;

      if (radiusError < 0) {
        radiusError += 2 * y + 1;
      } else {
        x--;
        radiusError += 2 * (y - x + 1);
      }
    }
    this.colorCircleGrid(pixelArr);
  }

  colorCircleGrid(arr) {
    this.prevColorOfCircle.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    //color new
    this.prevColorOfCircle = [];
    arr.forEach((item) => {
      if (
        item.x >= 0 &&
        item.x < this.columns &&
        item.y >= 0 &&
        item.y <= this.rows
      ) {
        this.prevColorOfCircle.push({
          x: item.x,
          y: item.y,
          color: this.grid[item.x][item.y],
        });
      }
   
    });
    arr.forEach((item) => {
      if (
        item.x < this.columns &&
        item.y < this.rows &&
        item.x >= 0 &&
        item.y >= 0
      )
        this.grid[item.x][item.y] = this.getColor();
    });
    this.drawGrid();
    //add new to prev
  }
  finishCircle(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.circleAlgorithm(...this.getRadiusAndCenter(endX, endY));
    this.circleX = null;
    this.circleY = null;
    this.prevColorOfCircle = [];
  }
  cancelCircle() {
    this.prevColorOfCircle.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    this.prevColorOfCircle = [];
    this.drawGrid();
  }
  //! CIRCLE FINISHED
  //!ELLIPSE
  initEllipse(cX, cY, left, top) {
    [this.ellipseX, this.ellipseY] = this.getPixel(cX, cY, left, top);
    console.log(this.ellipseX, this.ellipseY);
  }

  getWidthHeightAndCenter(endX, endY) {
    const rx = Math.abs(this.ellipseX - endX);
    const ry = Math.abs(this.ellipseY - endY);
    const cx = Math.floor(rx / 2) + this.ellipseX;
    const cy = Math.floor(ry / 2) + this.ellipseY;
    return [rx, ry, cx, cy];
  }

  drawEllipse(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.ellipseAlgorithm(...this.getWidthHeightAndCenter(endX, endY));
  }

  ellipseAlgorithm(ry, rx, yc, xc) {
    //!I have no idea why alternating coordinates works😐😶

    let pixelArr = [];
    var dx, dy, d1, d2, x, y;
    x = 0;
    y = ry;

    // Initial decision parameter of region 1
    d1 = ry * ry - rx * rx * ry + 0.25 * rx * rx;
    dx = 2 * ry * ry * x;
    dy = 2 * rx * rx * y;

    // For region 1
    while (dx < dy) {
      // Print points based on 4-way symmetry
      pixelArr.push({ x: x + xc, y: y + yc });
      pixelArr.push({ x: -x + xc, y: y + yc });
      pixelArr.push({ x: x + xc, y: -y + yc });
      pixelArr.push({ x: -x + xc, y: -y + yc });

      // Checking and updating value of
      // decision parameter based on algorithm
      if (d1 < 0) {
        x++;
        dx = dx + 2 * ry * ry;
        d1 = d1 + dx + ry * ry;
      } else {
        x++;
        y--;
        dx = dx + 2 * ry * ry;
        dy = dy - 2 * rx * rx;
        d1 = d1 + dx - dy + ry * ry;
      }
    }

    // Decision parameter of region 2
    d2 =
      ry * ry * ((x + 0.5) * (x + 0.5)) +
      rx * rx * ((y - 1) * (y - 1)) -
      rx * rx * ry * ry;

    // Plotting points of region 2
    while (y >= 0) {
      // Print points based on 4-way symmetry
      pixelArr.push({ x: x + xc, y: y + yc });
      pixelArr.push({ x: -x + xc, y: y + yc });
      pixelArr.push({ x: x + xc, y: -y + yc });
      pixelArr.push({ x: -x + xc, y: -y + yc });

      // Checking and updating parameter
      // value based on algorithm
      if (d2 > 0) {
        y--;
        dy = dy - 2 * rx * rx;
        d2 = d2 + rx * rx - dy;
      } else {
        y--;
        x++;
        dx = dx + 2 * ry * ry;
        dy = dy - 2 * rx * rx;
        d2 = d2 + dx - dy + rx * rx;
      }
    }
    this.colorCircleGrid(pixelArr);
  }
  finishEllipse(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.ellipseAlgorithm(...this.getWidthHeightAndCenter(endX, endY));
    this.ellipseX = null;
    this.ellipseY = null;
    this.prevColorOfCircle = [];
  }
  cancelEllipse() {
    this.prevColorOfCircle.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });
    this.prevColorOfCircle = [];
    this.drawGrid();
  }
  //!ELLIPSE FINISHED
  getPixel(cX, cY, left, top) {
    const clientX = cX - left;
    const clientY = cY - top;
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    return [c, r];
  }
  addCanvas(c) {
    this.c = c;
  }
  getReduxState() {
    return store.getState();
  }
  copyFrame(grid) {
    this.grid = grid;
    this.drawFrame(grid);
  }
  addFrame(grid) {
    this.grid = grid;
    this.drawFrame(grid);
  }
  drawFrame(grid) {
    this.c.clearRect(0, 0, CANVASW, CANVASH);
    let i = 0,
      j = 0;
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        this.c.fillStyle = grid[i][j];
        this.c.fillRect(j * this.cellW, i * this.cellH, this.cellW, this.cellH);
      }
    }
  }
  drawGrid() {
    this.c.clearRect(0, 0, CANVASW, CANVASH);
    let i = 0,
      j = 0;
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        this.c.fillStyle = this.grid[i][j];
        this.c.fillRect(j * this.cellW, i * this.cellH, this.cellW, this.cellH);
      }
    }
  }
  drawBlank() {
    this.c.clearRect(0, 0, CANVASW, CANVASH);
    let i = 0,
      j = 0;
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        this.grid[i][j] = "#ffffff";
        this.c.fillStyle = "#ffffff";
        this.c.fillRect(j * this.cellW, i * this.cellH, this.cellW, this.cellH);
      }
    }
  }
  getColor() {
    return store.getState().canvas.color.current;
  }
  setColor(color) {
    console.log(color);
    this.newColor = color;
  }
  getEraser() {
    return store.getState().canvas.eraser;
  }
  pencil(e) {
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;

    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    this.grid[r][c] = this.getColor();
    //!MIRROR
    if (store.getState().canvas.mirror) {
      const mirrorC = this.columns - c - 1;
      this.mirrorIt(r, mirrorC, this.getColor());
    }
    this.drawGrid();
  }
  mirrorV() {
    const half = this.rows / 2;
    for (let i = 0; i < half; i++) {
      this.grid[this.columns - 1 - i] = this.grid[i];
    }
  }
  mirrorH() {
    const half = this.rows / 2;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < half; j++) {
        this.grid[i][this.columns - 1 - j] = this.grid[i][j];
      }
    }
  }
  erase(e) {
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;

    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    this.grid[r][c] = "#ffffff";
    if (store.getState().canvas.mirror) {
      this.mirrorIt(r, this.columns - 1 - c, "#ffffff");
    }
    this.drawGrid();
  }
  mirrorIt(r, c, color) {
    this.grid[r][c] = color;
  }
  initMoveGrid(cX, cY, left, top) {
    [this.moveX, this.moveY] = this.getPixel(cX, cY, left, top);
    this.newMoveArr = [];
  
  }
  moveGrid(cX, cY, left, top) {
    const [endX, endY] = this.getPixel(cX, cY, left, top);
    this.newMoveArr = [];
    for (let i = 0; i < this.rows; i++) {
      this.newMoveArr.push(new Array(this.columns).fill("#ffffff"));
    }

    //! X start
    if (this.moveX > endX) {
      const diffX = this.moveX - endX;
      for (let k = 0; k < this.rows; k++) {
        let j = 0;
        let l;
        for (l = diffX; l < this.columns; l++) {
          this.newMoveArr[k][j++] = this.grid[k][l];
        }
      }
      console.log(this.newMoveArr);
    } else {
      const diffX = endX - this.moveX;
      for (let k = 0; k < this.rows; k++) {
        let j = 0;
        for (let l = diffX; l < this.columns; l++) {
          this.newMoveArr[k][l] = this.grid[k][j++];
        }
      }
      console.log(this.newMoveArr);
    }
    //! X ends

    this.newNewMoveArr = [];
    for (let i = 0; i < this.rows; i++) {
      this.newNewMoveArr.push(new Array(this.columns).fill("#ffffff"));
    }
    //! y starts
    if (this.moveY > endY) {
      const diffY = this.moveY - endY;
      let j = 0;
      for (let i = diffY; i < this.rows; i++) {
        this.newNewMoveArr[j] = this.newMoveArr[i];
        j++;
      }
    } else if (this.moveY <= endY) {
      const diffY = endY - this.moveY;
      let j = 0;
      for (let i = diffY; i < this.rows; i++) {
        this.newNewMoveArr[i] = this.newMoveArr[j++];
      }
    }
    //! y ends
    this.drawFrame(this.newNewMoveArr);
  }
  finishMoveGrid(cX, cY, left, top) {
    this.addFrame(this.newNewMoveArr);
  }
  //TODO NOT WORKING
  floodfill(e) {
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    console.log(r, c);
    const srcBg = this.grid[r][c];

    this.floodfillRecursive(r, c, srcBg, this.getColor());
    this.drawGrid();
  }
  floodfillRecursive(r, c, srcBg, destBg) {
    if (this.grid[r][c] === srcBg) {
      this.grid[r][c] = destBg;
      if (r + 1 !== this.rows && this.grid[r + 1][c] === srcBg) {
        this.floodfillRecursive(r + 1, c, srcBg, destBg);
      }
      if (r - 1 >= 0 && this.grid[r - 1][c] === srcBg) {
        this.floodfillRecursive(r - 1, c, srcBg, destBg);
      }
      if (c - 1 >= 0 && this.grid[r][c - 1] === srcBg) {
        this.floodfillRecursive(r, c - 1, srcBg, destBg);
      }
      if (c + 1 !== this.columns && this.grid[r][c + 1] === srcBg) {
        this.floodfillRecursive(r, c + 1, srcBg, destBg);
      }
    }
    return;
  }
  getGrid() {
    return this.grid;
  }
}
const grid = new Grid(dimension, dimension);
store.dispatch({ type: "GRID", grid: grid });
export default grid;
