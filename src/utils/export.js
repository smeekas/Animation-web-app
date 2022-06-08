import store from "../store";
let imgs, grid, canvasRef;
var cStream,
  recorder,
  chunks = [];

export function startRecord() {
  // this.textContent = "stop recording";
console.log("HERE");
  imgs = store.getState().frames.frames.map((item) => item.image);
  grid = store.getState().canvas.grid;
  canvasRef = store.getState().canvas.canvasRef;
  // set the framerate to 30FPS
  var cStream = canvasRef.captureStream(30);
  // create a recorder fed with our canvas' stream
  recorder = new MediaRecorder(cStream);
  // start it
  recorder.start();
  // save the chunks
  recorder.ondataavailable = saveChunks;

  recorder.onstop = exportStream;
  //   // change our button's function
  //   this.onclick = stopRecording;
}
async function updateCanvas() {
  console.log("updated");
  let i = 0;
  const si = setInterval(() => {
    if (i < imgs.length) {
      grid.drawFrame(imgs[i++]);
    } else {
      clearInterval(si);
      stopRecording();
    }
  }, 50);
}

function saveChunks(e) {
  // console.log(e.data);
  updateCanvas();
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
  var vid = document.createElement("video");
  vid.controls = true;
  vid.src = vidURL;
  vid.onended = function () {
    URL.revokeObjectURL(vidURL);
  };
  // document.body.insertBefore(vid, canvas);
}

// make something move on the canvas
// var x = 0;
// var ctx = canvas.getContext('2d');

// var anim = function() {
//   x = (x + 2) % (canvas.width + 100);
//   // there is no transparency in webm,
//   // so we need to set a background otherwise every transparent pixel will become opaque black
//   ctx.fillStyle = 'ivory';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = 'black';
//   ctx.fillRect(x - 50, 20, 50, 50)
//   requestAnimationFrame(anim);
// };
// anim();
