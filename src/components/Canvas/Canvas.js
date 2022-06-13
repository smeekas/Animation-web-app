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
  useEffect(() => {
    dispatch({
      type: "CANVAS_INIT",
      canvasRef: canvasRef.current,
    });
    canvasRef.current.width = Number(process.env.REACT_APP_CANVAS_DIAMENTION);
    canvasRef.current.height = Number(process.env.REACT_APP_CANVAS_DIAMENTION);
    if (!grid.c) {
      grid.addCanvas(canvasRef.current.getContext("2d"));
    }
  }, [dispatch]);
  return (
    <div className={styles.canvasDiv}>
      <div className={styles.canvas}>
        <canvas
          onPointerMove={(e) => {
            if (e.buttons === 1) {
              if (allControl.line) {
                grid.drawLine(
                  e.clientX,
                  e.clientY,
                  e.target.offsetLeft,
                  e.target.offsetTop
                );

                return;
              }
              // if (allControl.eraser || allControl.pencil) {
              //   grid.getPosition(e);
              //   return;
              // }
              if (allControl.pencil) {
                grid.pencil(e);
                return;
              }
              if (allControl.eraser) {
                grid.erase(e);
                return;
              }
              if (allControl.ellipse) {
                grid.drawEllipse(
                  e.clientX,
                  e.clientY,
                  e.target.offsetLeft,
                  e.target.offsetTop
                );
              }
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            if (allControl.line) {
              grid.initLine(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );

              return;
            }
            // if (allControl.eraser || allControl.pencil) {
            //   grid.pencil(e);
            //   return;
            // }
            if (allControl.pencil) {
              grid.pencil(e);
              return;
            }
            if (allControl.eraser) {
              grid.erase(e);
              return;
            }
            if (allControl.flood) {
              grid.floodfill(e);
              return;
            }
            if (allControl.ellipse) {
              grid.initEllipse(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
            }
          }}
          onMouseUp={(e) => {
            if (allControl.line) {
              grid.finishLine(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
              return;
            }
            if (allControl.ellipse) {
              grid.finishEllipse(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
            }
          }}
          onMouseLeave={(e) => {
            if (e.buttons === 1) {
              if (allControl.line) {
                grid.cancelLine();
                return;
              }
              if (allControl.ellipse) {
                grid
                  .cancelEllipse
                  // e.clientX,
                  // e.clientY,
                  // e.target.offsetLeft,
                  // e.target.offsetTop
                  ();
              }
            }
          }}
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
    </div>
  );
}
export default Canvas;
