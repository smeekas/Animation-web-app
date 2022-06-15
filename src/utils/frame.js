import store from "../store";
export function getCanvasImage() {
  const image = store
    .getState()
    .canvas.canvasRef.toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  return image;
}

export function getCanvasGrid() {
  const gg = store.getState().canvas.grid.grid;
  const newGrid = [];
  for (let i = 0; i < gg.length; i++) {
    newGrid.push([]);
    for (let j = 0; j < gg[i].length; j++) {
      newGrid[i].push(gg[i][j]);
    }
  }

  return newGrid;
}
export function copyGrid(grid) {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    newGrid.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      newGrid[i].push(grid[i][j]);
    }
  }
  return newGrid;
}
