import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import eraser from "../../assets/eraser.png";
import pencil from "../../assets/pencil.png";
import paintBucket from "../../assets/paintBucket.png";
import diagonalLine from "../../assets/diagonalLine.png";
import ellipse from "../../assets/ellipse.png";
import colorWheel from "../../assets/colorWheel.png";
import { startRecord } from "../../utils/export";
import styles from "./Controls.module.css";
import Control from "../../Control/Control";
import Button from "../Button/Button";
function Controls() {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const grid = useSelector((state) => state.canvas.grid);
  const allFrames = useSelector((state) => state.frames.frames);
  const floodfillRef = useRef();
  const eraserRef = useRef();
  const lineRef = useRef();
  const colorRef = useRef();
  const pencilRef = useRef();
  const ellipseRef = useRef();
  const allControl = useSelector((state) => state.canvas);
  const colorHandler = (e) => {
    dispatch({ type: "COLOR", value: e.target.value });
  };
  const floodfillHandler = (e) => {
    dispatch({ type: "FLOODFILL", value: e.target.checked });
  };
  const eraserHandler = (e) => {
    dispatch({ type: "ERASER", value: e.target.checked });
  };
  const lineHandler = (e) => {
    dispatch({ type: "LINE", value: e.target.checked });
  };
  const pencilHandler = (e) => {
    dispatch({ type: "PENCIL", value: e.target.checked });
  };
  const ellipseHandler = (e) => {
    dispatch({ type: "ELLIPSE", value: e.target.checked });
  };
  return (
    <div className={styles.controls}>
      <div className={styles.drawControl}>
        <Control
          tooltipName="Paint Bucket"
          imgSrc={paintBucket}
          imgAlt="paint bucket"
          onClick={() => floodfillRef.current.click()}
          onChange={(e) => floodfillHandler(e)}
          checked={allControl.flood}
          ref={floodfillRef}
          type="checkbox"
        />

        <Control
          tooltipName="free hand"
          imgSrc={pencil}
          imgAlt="pencil"
          onClick={() => pencilRef.current.click()}
          onChange={(e) => pencilHandler(e)}
          checked={allControl.pencil}
          type="checkbox"
          ref={pencilRef}
        />

        <Control
          tooltipName="Eraser"
          imgSrc={eraser}
          imgAlt="eraser"
          onClick={() => eraserRef.current.click()}
          onChange={(e) => eraserHandler(e)}
          checked={allControl.eraser}
          type="checkbox"
          ref={eraserRef}
        />

        <Control
          tooltipName="Line"
          imgSrc={diagonalLine}
          imgAlt="line"
          onClick={() => lineRef.current.click()}
          onChange={(e) => lineHandler(e)}
          checked={allControl.line}
          type="checkbox"
          ref={lineRef}
        />

        <Control
          tooltipName="Ellipse"
          imgSrc={ellipse}
          imgAlt="ellipse"
          onClick={() => ellipseRef.current.click()}
          onChange={(e) => ellipseHandler(e)}
          checked={allControl.ellipse}
          type="checkbox"
          ref={ellipseRef}
        />

        <Control
          tooltipName="Color Picker"
          imgSrc={colorWheel}
          imgAlt="colorwheel"
          onClick={() => colorRef.current.click()}
          onChange={(e) => colorHandler(e)}
          checked={false}
          type="color"
          ref={colorRef}
        />
        <section
          style={{ backgroundColor: allControl.color }}
          className={styles.preview}
        ></section>
      </div>
      <section className={styles.allButtons}>
        <Button
          className={styles.button}
          onClick={() => {
            const image = canvasRef

              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
            const anchor = document.createElement("a");
            let i = 0;
            const interval = setInterval(() => {
              if (i === allFrames.length) {
                clearInterval(interval);
              }
              anchor.href = allFrames[i++].image;
              anchor.download = "img.png";
              anchor.click();
            }, 1000);
            // for (let frame in allFrames) {
            // }
          }}
        >
          download All Frames
        </Button>
        <Button
          className={styles.button}
          onClick={(e) => {
            startRecord();
          }}
        >
          export
        </Button>
      </section>
    </div>
  );
}
export default Controls;
