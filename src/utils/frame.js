import store from "../store";
import { List } from "immutable";
import { getImageData } from 'box-shadow-pixels'
import { Children } from "react";
import { canvasDimension, cellDimension, dimension } from "../variables";
export function getCanvasImage() {
  // const image = store
  //   .getState()
  //   .canvas.canvasRef.toDataURL("image/png")
  const grid = getCanvasGrid();
  // const newGrid=List();
  // grid.f.forEach((item)=>{
  //     newGrid.push(item)
  // })

  // console.log(newGrid);
  const cs = getImageData(grid.flat(),
    {
      c: dimension,
      pSize: (80/dimension),
      format: 'string'
    }
  )
  // console.log(cs);
  return cs;
}
export function getCanvasAsImage(grid) {
  const canvas = document.createElement('canvas');
  console.log(canvas);
  canvas.width = canvasDimension;
  canvas.height = canvasDimension;
  const ctx = canvas.getContext('2d');
  let i = 0,
    j = 0;
  for (i = 0; i < dimension; i++) {
    for (j = 0; j < dimension; j++) {
      ctx.fillStyle = grid[i][j];
      ctx.fillRect(j * cellDimension, i * cellDimension, cellDimension, cellDimension);
    }
  }
  return canvas.toDataURL("image/png")
}
export function getBlankCanvasImage(tempgrid) {
  const image = getImageData(tempgrid.flat(), {
    c: dimension, pSize: (80/dimension), format: 'string'
  })
  return image
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
