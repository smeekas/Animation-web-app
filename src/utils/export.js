import store from "../store";
import GIFEncoder from "gifencoder";
import { createCanvas } from "canvas";
import { Buffer } from "buffer";
import { canvasDimension, dimension, cellDimension } from "../variables";
let allFrames, ctx;
let closeFunction = null;
function drawFrame(grid) {
  let i, j;
  for (i = 0; i < dimension; i++) {
    for (j = 0; j < dimension; j++) {
      ctx.fillStyle = grid[i][j];
      ctx.fillRect(j * cellDimension, i * cellDimension, cellDimension, cellDimension);
    }
  }
}
export function startRecord(closeHandler) {
  allFrames = store.getState().frames.frames.map((item) => item.grid);
  closeFunction = closeHandler;
  store.dispatch({ type: "HIDE_WHILE_EXPORT" });
  const canvas = createCanvas(canvasDimension, canvasDimension)
  ctx = canvas.getContext('2d')
  const encoder = new GIFEncoder(canvasDimension, canvasDimension)
  const delay = store.getState().export.fps;

  encoder.setDelay(1000 / delay);
  encoder.setRepeat(0)
  encoder.start();
  allFrames.forEach(item => {
    drawFrame(item);
    encoder.addFrame(ctx);

  })
  encoder.finish();
  console.log("WORKS TILL HERE");
  const buff = encoder.out.data
  const blob = new Blob([Buffer.from(buff)], {
    type: "gif"
  })
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = "vid.gif";
  anchor.click();
  if (closeFunction) {

    closeFunction();
  }
}
