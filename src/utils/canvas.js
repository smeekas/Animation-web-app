import store from "../store";
const storeData = store.getState();
// const color = storeData.color;
const floodfill = storeData.flood;
let img;
// console.log(floodfill);
// const eraser = storeData.eraser;
const refData = store.getState().canvas.canvasRef;
// const CANVASH = refData?.height || 500;
const CANVASH = Number(process.env.REACT_APP_CANVAS_DIAMENTION);

// const CANVASW = refData?.width || 500;
const CANVASW = Number(process.env.REACT_APP_CANVAS_DIAMENTION);
class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.cellH = CANVASH / columns;
    this.cellW = CANVASW / rows;
    // console.log(this.cellH, this.cellW);

    this.color = "red";
    this.fill = "blue";
    this.grid = [];
    this.prevColorOfLine = [];
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
    [this.lineX, this.lineY] = this.getPixel(cX, cY, left, top);
    // console.log("DOWN");
  }
  drawLine(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.lineAlgorithm(this.lineX, this.lineY, endX, endY);
  }
  finishLine(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.lineAlgorithm(this.lineX, this.lineY, endX, endY);
    this.lineX = null;
    this.lineY = null;
    this.prevColorOfLine = [];

    // console.log("UP");
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
      // this.grid[x][y] = "black";
      pixelarr.push({ x: x, y: y });
      // this.drawGrid();
      //pixel(x, y); // Draw first pixel        // Rasterize the line
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
        // this.grid[x][y] = "black";
        pixelarr.push({ x: x, y: y });
        // this.drawGrid();
        // pixel(x, y);
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
      // this.grid[x][y] = "black";
      pixelarr.push({ x: x, y: y });
      // this.drawGrid();
      //  pixel(x, y); // Draw first pixel        // Rasterize the line
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
        // pixel(x, y);
        // this.grid[x][y] = "black";
        pixelarr.push({ x: x, y: y });
        // this.drawGrid();
      }
    }
    this.colorLineGrid(pixelarr);
  }
  cancelLine() {
    this.prevColorOfLine.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });

    this.drawGrid();
  }
  colorLineGrid(arr) {
    //color prev
    this.prevColorOfLine.forEach((item) => {
      this.grid[item.x][item.y] = item.color;
    });

    //color new
    this.prevColorOfLine = [];
    arr.forEach((item) => {
      this.prevColorOfLine.push({
        x: item.x,
        y: item.y,
        color: this.grid[item.x][item.y],
      });
      this.grid[item.x][item.y] = this.getColor();
    });
    this.drawGrid();
    //add new to prev
  }
  //!LINE FINISHED

  //! CIRCLE

  initCircle(cX, cY, left, top) {
    [this.circleX, this.circleY] = this.getPixel(cX, cY, left, top);
    // console.log(this.circleX, this.circleY);
  }
  getRadiusAndCenter(endX, endY) {
    const rx = Math.abs(this.circleX - endX);
    const ry = Math.abs(this.circleY - endY);
    const min = rx > ry ? ry : rx;
    const cx = Math.floor(min / 2) + this.circleX;
    const cy = Math.floor(min / 2) + this.circleY;
    return [cx, cy, Math.floor(min / 2)];
  }
  // drawEllipse(cX, cY, left, top) {
  //   let [endX, endY] = this.getPixel(cX, cY, left, top);
  //   this.midptellipse(...this.getEllipseWidthAndHeightAndCenter(endX, endY));
  //   // console.log(endX, endY);
  // }
  drawCircle(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.circleAlgorithm(...this.getRadiusAndCenter(endX, endY));
  }

  circleAlgorithm(x0, y0, radius) {
    let pixelArr = [];
    // console.log(x0,y0,radius)
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
    //TODO either green or red
    //* arr = arr.filter((item, pos) => a.indexOf(item) == pos);
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
      //* this.grid[item.x][item.y] = this.getColor();
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

    // console.log("UP");
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
    // console.log(this.circleX, this.circleY);
  }

  getWidthHeightAndCenter(endX, endY) {
    const rx = Math.abs(this.ellipseX - endX);
    const ry = Math.abs(this.ellipseY - endY);
    // const min = rx > ry ? ry : rx;
    const cx = Math.floor(rx / 2) + this.ellipseX;
    const cy = Math.floor(ry / 2) + this.ellipseY;
    return [rx, ry, cx, cy];
  }

  drawEllipse(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.ellipseAlgorithm(...this.getWidthHeightAndCenter(endX, endY));
  }

  ellipseAlgorithm(rx, ry, xc, yc) {
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
    console.log(pixelArr);
    this.colorCircleGrid(pixelArr);
  }
  finishEllipse(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    this.ellipseAlgorithm(...this.getWidthHeightAndCenter(endX, endY));
    this.ellipseX = null;
    this.ellipseY = null;
    this.prevColorOfCircle = [];

    // console.log("UP");
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
    return [r, c];
  }
  addCanvas(c) {
    this.c = c;
    this.drawGrid();
  }
  getReduxState() {
    return store.getState();
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
        // console.log("HERE");
        this.c.fillStyle = grid[i][j];
        // this.c.fillStyle = this.getColor();
        // console.log(j * this.cellW, i * this.cellH);
        this.c.fillRect(j * this.cellW, i * this.cellH, this.cellW, this.cellH);
      }
    }
  }
  drawGrid() {
    this.c.clearRect(0, 0, CANVASW, CANVASH);
    console.log("draw");
    let i = 0,
      j = 0;
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        // console.log("HERE");
        this.c.fillStyle = this.grid[i][j];
        // console.log(j * this.cellW, i * this.cellH);
        this.c.fillRect(j * this.cellW, i * this.cellH, this.cellW, this.cellH);
      }
    }
  }
  getColor() {
    // return `rgb(${Math.random() * 255},${Math.random() * 255},${
    //   Math.random() * 255
    // }) `;
    return store.getState().canvas.color;
  }
  // getPosition(e) {
  //   // console.log("pos");
  //   // return;
  //   const clientX = e.clientX - e.target.offsetLeft;
  //   const clientY = e.clientY - e.target.offsetTop;
  //   let r = Math.floor(clientY / this.cellW);
  //   let c = Math.floor(clientX / this.cellH);
  //   //   if (eraser.checked) {
  //   // if (this.getEraser()) {
  //   //   this.grid[r][c] = "#ffffff";
  //   //   this.drawGrid();
  //   //   return;
  //   // }
  //   this.grid[r][c] = this.getColor();
  //   this.drawGrid();
  // }
  getEraser() {
    return store.getState().canvas.eraser;
  }
  pencil(e) {
    // if (this.getReduxState().canvas.flood) {
    //   this.floodfill(e);
    //   return;
    // }
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;

    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);

    // if (this.getEraser()) {
    //   this.grid[r][c] = "#ffffff";
    //   this.drawGrid();
    //   return;
    // }

    this.grid[r][c] = this.getColor();
    this.drawGrid();
  }
  erase(e) {
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;

    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    this.grid[r][c] = "#ffffff";
    this.drawGrid();
  }
  floodfill(e) {
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);

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
  setColor(e) {
    this.color = e.target.value;
  }
  getGrid() {
    return this.grid;
  }
}
const grid = new Grid(40, 40);
store.dispatch({ type: "GRID", grid: grid });
export default grid;
