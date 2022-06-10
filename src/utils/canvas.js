import store from "../store";
const storeData = store.getState();
// const color = storeData.color;
const floodfill = storeData.flood;
let img;
// console.log(floodfill);
// const eraser = storeData.eraser;
const refData = store.getState().canvas.canvasRef;
const CANVASH = refData?.height || 300;
const CANVASW = refData?.width || 300;
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
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < columns; j++) {
        this.grid[i].push("#ffffff");
      }
    }
  }
  initLine(cX, cY, left, top) {
    [this.lineX, this.lineY] = this.getPixel(cX, cY, left, top);
    // console.log("DOWN");
  }
  drawLine(cX, cY, left, top) {
    // console.log(e.target);
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    // this.lineAlgo(endX, endY);
    this.draw_line(this.lineX, this.lineY, endX, endY);
    // console.log("MOVE");
  }
  finishLine(cX, cY, left, top) {
    let [endX, endY] = this.getPixel(cX, cY, left, top);
    // this.lineAlgo(endX, endY);
    this.draw_line(this.lineX, this.lineY, endX, endY);
    this.prevColorOfLine = [];

    // console.log("UP");
  }
  lineAlgo(x2, y2) {
    console.log("line");
    let x1 = this.lineX;
    let y1 = this.lineY;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let p = 2 * dy - dx;
    while (x1 <= x2) {
      this.grid[x1][y1] = "black";
      this.drawGrid();
      x1++;
      if (p < 0) {
        p = p + 2 * dy;
      } else {
        p += 2 * dy - 2 * dx;
        y1++;
      }
    }
  }

  draw_line(x1, y1, x2, y2) {
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
    this.colorLine(pixelarr);
  }
  colorLine(arr) {
    //color prev
    // console.log(arr);
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
  getPixel(cX, cY, left, top) {
    const clientX = cX - left;
    const clientY = cY - top;
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    return [r, c];
  }
  addCanvas(c) {
    // console.log(c);
    this.c = c;
    this.drawGrid();
  }
  getReduxState() {
    return store.getState();
  }
  addFrame(grid) {
    this.grid = grid;
    // console.log(grid);
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
    // console.log(this.cellH, this.cellW);
    this.c.clearRect(0, 0, CANVASW, CANVASH);
    console.log("draw");
    let i = 0,
      j = 0;
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        // console.log("HERE");
        this.c.fillStyle = this.grid[i][j];
        // this.c.fillStyle = this.getColor();
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
  getPosition(e) {
    if (e.buttons === 1) {
      // console.log("pos");
      // return;
      const clientX = e.clientX - e.target.offsetLeft;
      const clientY = e.clientY - e.target.offsetTop;
      let r = Math.floor(clientY / this.cellW);
      let c = Math.floor(clientX / this.cellH);
      //   if (eraser.checked) {
      if (this.getEraser()) {
        this.grid[r][c] = "#ffffff";
        this.drawGrid();
        return;
      }
      this.grid[r][c] = this.getColor();
      this.drawGrid();
    }
  }
  getEraser() {
    return store.getState().canvas.eraser;
  }
  clicked(e) {
    // console.log(floodfill);
    if (this.getReduxState().canvas.flood) {
      // console.log("HERE");
      this.floodfill(e);
      return;
    }
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;
    // console.log(clientX, this.cellW);
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    // console.log(e.target.getBoundingClientRect().left);
    // console.log(e.target.offsetLeft);
    // console.log(r, c);
    if (this.getEraser()) {
      this.grid[r][c] = "#ffffff";
      this.drawGrid();
      return;
    }

    this.grid[r][c] = this.getColor();
    this.drawGrid();
  }
  floodfill(e) {
    let queue = [];
    const clientX = e.clientX - e.target.offsetLeft;
    const clientY = e.clientY - e.target.offsetTop;
    let r = Math.floor(clientY / this.cellW);
    let c = Math.floor(clientX / this.cellH);
    // console.log(r, c);
    // console.log(this.rows, this.columns);
    const srcBg = this.grid[r][c];
    queue.push({
      r: r,
      c: c,
    });

    // while (queue.length != 0) {
    //   if (queue.length > maxlen) {
    //     maxlen = queue.length;
    //   }
    //   if (
    //     queue[0].r < 0 ||
    //     queue[0].r > this.rows ||
    //     queue[0].c < 0 ||
    //     queue[0].c > this.columns
    //   ) {
    //     queue.shift();
    //     continue;
    //   }

    //   const newR = queue[0].r;
    //   const newC = queue[0].c;

    //   //   this.grid[newR][newC] = colorPicker.value;
    //   this.grid[newR][newC] = this.getColor();
    //   if (newR + 1 !== this.rows && this.grid[newR + 1][newC] === srcBg) {
    //     queue.push({
    //       r: newR + 1,
    //       c: newC,
    //     });
    //   }
    //   if (newR - 1 >= 0 && this.grid[newR - 1][newC] === srcBg) {
    //     queue.push({
    //       r: newR - 1,
    //       c: newC,
    //     });
    //   }
    //   if (newC - 1 >= 0 && this.grid[newR][newC - 1] === srcBg) {
    //     queue.push({
    //       r: newR,
    //       c: newC - 1,
    //     });
    //   }
    //   if (newC + 1 !== this.columns && this.grid[newR][newC + 1] === srcBg) {
    //     queue.push({
    //       r: newR,
    //       c: newC + 1,
    //     });
    //   }
    //   queue.shift();
    // }
    this.floodfillRecursive(r, c, srcBg, this.getColor());
    this.drawGrid();
    // queue = [];
    // console.log(maxlen);
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
// console.log(storeData.canvas);
export default grid;
// storeData.canvasRef.addEventListener("pointermove", (e) => grid.getPosition(e));
// storeData.canvasRef.addEventListener("click", (e) => grid.floodfill(e));
// storeData.canvasRef.addEventListener("click", (e) => grid.clicked(e));

// colorPicker.addEventListener("input", (e) => grid.setColor/*(e));
