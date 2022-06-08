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
  // useEffect(() => {}, [canva]);
  return (
    <div className={styles.canvas}>
      <canvas
        onPointerMove={(e) => {
          // console.log("pointermove");
          grid.getPosition(e);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          console.log(e);
          grid.clicked(e);
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
    </div>
  );
}
export default Canvas;
