import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Canvas.module.css";
import grid from "../../utils/canvas";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
function Canvas() {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const currIndex = useSelector((state) => state.frames.currFrame);
  const videoSrc = useSelector((state) => state.export.videoBlob);
  const allControl = useSelector((state) => state.canvas);
  // const [canva, setCanva] = useState(null);
  useEffect(() => {
    // console.log()
    dispatch({
      type: "CANVAS_INIT",
      canvasRef: canvasRef.current,
    });
    canvasRef.current.width = 300;
    canvasRef.current.height = 300;
    if (!grid.c) {
      // console.log("ADD");
      grid.addCanvas(canvasRef.current.getContext("2d"));
    }
  }, [dispatch]);
  // useEffect(() => {s}, [canva]);
  return (
    <div className={styles.canvas}>
      <canvas
        onPointerMove={(e) => {
          if (allControl.line && e.buttons === 1) {
            grid.drawLine(
              e.clientX,
              e.clientY,
              e.target.offsetLeft,
              e.target.offsetTop
            );

            return;
          }
          grid.getPosition(e);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          // console.log(e);
          if (allControl.line) {
            grid.initLine(
              e.clientX,
              e.clientY,
              e.target.offsetLeft,
              e.target.offsetTop
            );

            return;
          }
          grid.clicked(e);
        }}
        onMouseUp={(e) => {
          if (allControl.line) {
            grid.finishLine(
              e.clientX,
              e.clientY,
              e.target.offsetLeft,
              e.target.offsetTop
            );
          }
        }}
        // onMouseLeave={(e) => {
        //   console.log(currIndex);
        //   if (currIndex != null) {
        //     dispatch({
        //       type: "FRAME_UPDATE",
        //       index: currIndex,
        //       grid: getCanvasGrid(),
        //       image: getCanvasImage(),
        //     });
        //   }
        // }}
        ref={canvasRef}
      ></canvas>
      <section className={styles.op}>
        {videoSrc && (
          <video controls>
            <source src={videoSrc} type="videp/mp4" />
          </video>
        )}
      </section>
    </div>
  );
}
export default Canvas;
