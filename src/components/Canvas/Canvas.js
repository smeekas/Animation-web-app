import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Canvas.module.css";
import grid from "../../utils/canvas";
import { getCanvasAsImage, getCanvasGrid, getCanvasImage } from "../../utils/frame";
import { canvasDimension } from "../../variables";
function Canvas() {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const onion = useSelector((state) => state.onion.showScreen);
  const frameObj = useSelector((state) => state.frames);
  let imageOverCanvas = null,
    imageClassName;
  if (onion && frameObj.currFrame !== 0) {
    imageOverCanvas = getCanvasAsImage(frameObj.frames[frameObj.currFrame - 1].grid);
    imageClassName = styles.onionImage;
  }
  const videoSrc = useSelector((state) => state.export.videoBlob);
  const allControl = useSelector((state) => state.canvas);
  useEffect(() => {
    dispatch({
      type: "CANVAS_INIT",
      canvasRef: canvasRef.current,
    });
    canvasRef.current.width = canvasDimension;
    canvasRef.current.height = canvasDimension;
    if (!grid.c) {
      grid.addCanvas(canvasRef.current.getContext("2d"));
      grid.drawBlank()
    }
  }, [dispatch]);
  return (
    <div className={styles.canvasDiv}>
      <div
        className={styles.canvas}
        style={{
          width: `${canvasDimension}px`,
          height: `${canvasDimension}px`,
        }}
      >

        {onion && (
          <img className={imageClassName} src={imageOverCanvas} alt="onion" />
        )}
        <canvas
          style={onion ? { opacity: "0.5" } : {}}
          onContextMenu={(e) => e.preventDefault()}
          onPointerMove={(e) => {
            if (e.buttons === 1 || e.buttons === 2) {
              console.log("MOVE");
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
                return;
              }
              if (allControl.rect) {
                grid.drawRect(
                  e.clientX,
                  e.clientY,
                  e.target.offsetLeft,
                  e.target.offsetTop
                );
                return;
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
              return;
            }
            if (allControl.rect) {
              grid.initRect(
                e.clientX,
                e.clientY,
                e.target.offsetLeft,
                e.target.offsetTop
              );
              return;
            }
          }}
          onMouseUp={(e) => {
            dispatch({
              type: "CURRENT_FRAME_UPDATE", payload: {
                grid: getCanvasGrid(),
                image: getCanvasImage(),
              }
            })
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
            } else if (allControl.rect) {
              grid.finishRect(
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
              if (allControl.rect) {
                grid.cancelRect();
              }
            }
          }}
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
}
export default Canvas;
