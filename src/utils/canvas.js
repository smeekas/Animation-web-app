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
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < columns; j++) {
        this.grid[i].push("#ffffff");
      }
    }
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
    let maxlen = 0;
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
const grid = new Grid(25, 25);
store.dispatch({ type: "GRID", grid: grid });
// console.log(storeData.canvas);
export default grid;
// storeData.canvasRef.addEventListener("pointermove", (e) => grid.getPosition(e));
// storeData.canvasRef.addEventListener("click", (e) => grid.floodfill(e));
// storeData.canvasRef.addEventListener("click", (e) => grid.clicked(e));

// colorPicker.addEventListener("input", (e) => grid.setColor/*(e));
