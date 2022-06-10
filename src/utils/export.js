import store from "../store";
let allFrames, grid, canvasRef;
var cStream,
  recorder,
  chunks = [];

export function startRecord() {
  // this.textContent = "stop recording";
  console.log("HERE");
  allFrames = store.getState().frames.frames.map((item) => item.grid);
  grid = store.getState().canvas.grid;
  canvasRef = store.getState().canvas.canvasRef;
  // set the framerate to 30FPS
  var cStream = canvasRef.captureStream(30);
  // create a recorder fed with our canvas' stream
  recorder = new MediaRecorder(cStream);
  // start it

  recorder.start();
  anim();
  // save the chunks
  recorder.ondataavailable = saveChunks;

  recorder.onstop = exportStream;
  // change our button's function
}
// async function updateCanvas() {
//   console.log("updated");
// }

function saveChunks(e) {
  // console.log(e.data);
  // updateCanvas();
  chunks.push(e.data);
}

function stopRecording() {
  recorder.stop();
  console.log("stopped");
}

function exportStream(e) {
  // combine all our chunks in one blob
  var blob = new Blob(chunks);
  // do something with this blob
  var vidURL = URL.createObjectURL(blob);
  console.log(blob);
  var vid = document.createElement("video");
  vid.controls = true;
  vid.src = vidURL;
  vid.onended = function () {
    URL.revokeObjectURL(vidURL);
  };
  //!----------------------------------------------------------
  // const image = canvasRef
  //   .toDataURL("image/png")
  //   .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
  const anchor = document.createElement("a");
  anchor.href = vidURL;
  anchor.download = "vid.mp4";
  anchor.click();
  // document.body.insertBefore(vid, canvas);
}

// var x = 0;
// var ctx = store.getState().canvas.canfasRef;
// let record = true;
let nc = 0;
var anim = function () {
  const to = setInterval(() => {
    if (nc === allFrames.length) {
      clearInterval(to);
      stopRecording();
    }
    console.log("here");
    grid.drawFrame(allFrames[nc]);
    nc++;
    // ctx.clearRect(0, 0, 500, 200);
    // ctx.fillStyle = "ivory";
    // ctx.fillRect(0, 0, 500, 200);
    // ctx.fillStyle = "black";
    // ctx.fillRect(getRand() * 300, getRand() * 100, 50, 50);
  }, 1000);
};

// anim();
function getRand() {
  return Math.random();
}
