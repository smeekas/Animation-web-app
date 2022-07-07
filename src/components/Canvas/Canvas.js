import { useEffect } from "react";
// import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Canvas.module.css";
import grid from "../../utils/canvas";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
import temp from "../../assets/temp.png";
function Canvas() {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const onion = useSelector((state) => state.onion.showScreen);
  const frameObj = useSelector((state) => state.frames);
  const export_hide = useSelector((state) => state.export.hide);
  // const color = useSelector((state) => state.canvas.color);
  // const prevImage = onion
  //   ? frameObj.frames[frameObj.currFrame - 1].image
  //   : null;
  let imageOverCanvas = null,
    imageClassName;
  if (onion && frameObj.currFrame !== 0) {
    imageOverCanvas = frameObj.frames[frameObj.currFrame - 1].image;
    imageClassName = styles.onionImage;
  }
  if (export_hide) {
    imageOverCanvas = temp;
    imageClassName = styles.exportImage;
  }
  const videoSrc = useSelector((state) => state.export.videoBlob);
  const allControl = useSelector((state) => state.canvas);
  useEffect(() => {
    dispatch({
      type: "CANVAS_INIT",
      canvasRef: canvasRef.current,
    });
    canvasRef.current.width = 500;
    canvasRef.current.height = 500;
    if (!grid.c) {
      grid.addCanvas(canvasRef.current.getContext("2d"));
    }
  }, [dispatch]);
  return (
    <div className={styles.canvasDiv}>
      <div
        className={styles.canvas}
        style={{
          width: `500px`,
          height: `500px`,
        }}
      >
        {(onion || export_hide) && (
          <img className={imageClassName} src={imageOverCanvas} alt="onion" />
        )}
        {/* {onion && (
          <img className={styles.onionImage} src={prevImage} alt="onion" />
        )} */}
        <canvas
          style={onion ? { opacity: "0.5" } : {}}
          onContextMenu={(e) => e.preventDefault()}
          onPointerMove={(e) => {
            //TODO set color
            if (e.buttons === 1 || e.buttons === 2) {
              if (allControl.line) {
                grid.drawLine(
                  e.clientX,
                  e.clientY,
                  e.target.offsetLeft,
                  e.target.offsetTop
                );

                return;
              }
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
                return;
              }
              if (allControl.move) {
                grid.moveGrid(
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
            if (e.buttons === 1) {
              dispatch({ type: "SET_CURR_COLOR_PRIMARY" });
            } else {
              dispatch({ type: "SET_CURR_COLOR_SECONDARY" });
            }

            if (allControl.line) {
              grid.initLine(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );

              return;
            }
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
              return;
            }
            if (allControl.move) {
              grid.initMoveGrid(
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
            } else if (allControl.ellipse) {
              grid.finishEllipse(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
            } else if (allControl.move) {
              grid.finishMoveGrid(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
            }
            setTimeout(() => {
              dispatch({
                type: "PUSH_TO_HISTORY",
                index: frameObj.currFrame,
                grid: getCanvasGrid(),
              });
            }, 10);
          }}
          onMouseLeave={(e) => {
            if (e.buttons === 1) {
              if (allControl.line) {
                grid.cancelLine();
                return;
              }
              if (allControl.ellipse) {
                grid.cancelEllipse();
              }
            }
          }}
          ref={canvasRef}
        ></canvas>
      </div>
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
