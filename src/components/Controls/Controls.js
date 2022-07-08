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
import Control from "../Control/Control";
import Button from "../Button/Button";
import { TbArrowsDiagonal2 } from "react-icons/tb";
import { useState } from "react";
function Controls() {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const grid = useSelector((state) => state.canvas.grid);
  const allFrames = useSelector((state) => state.frames.frames);
  const color = useSelector((state) => state.canvas.color);
  const [whichColor, setWhichColor] = useState(null);
  const floodfillRef = useRef();
  const eraserRef = useRef();
  const lineRef = useRef();
  const colorRef = useRef();
  const pencilRef = useRef();
  const ellipseRef = useRef();
  const moveRef = useRef();
  const allControl = useSelector((state) => state.canvas);
  const colorHandler = (e) => {
    console.log(e.target.value);
    dispatch({ type: "COLOR", colorVal: e.target.value, color: whichColor });
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
  const moveHandler = (e) => {
    dispatch({ type: "MOVE", value: e.target.checked });
  };
  const horizontalMirrorHandler=()=>{
      //TODO
   
  }
  // console.log(color);
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
          tooltipName="Free Hand"
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
          tooltipName="move"
          imgSrc={paintBucket}
          imgAlt="ellipse"
          onClick={() => moveRef.current.click()}
          onChange={(e) => moveHandler(e)}
          checked={allControl.move}
          type="checkbox"
          ref={moveRef}
        />
        {/* <Control
          tooltipName="Color Picker"
          imgSrc={colorWheel}
          imgAlt="colorwheel"
          onClick={() => colorRef.current.click()}
          onChange={(e) => colorHandler(e)}
          checked={false}
          type="color"
          ref={colorRef}
        /> */}
        <section
          // style={{ backgroundColor: allControl.color }}
          className={styles.colorPicker}
        >
          <input
            onChange={(e) => colorHandler(e)}
            style={{ visibility: "hidden" }}
            type="color"
            ref={colorRef}
          />
          <div
            style={{ backgroundColor: color.primary }}
            className={`${styles.primary} ${styles.colorBox}`}
            onClick={() => {
              setWhichColor("primary");
              colorRef.current.click();
            }}
          ></div>
          <div
            style={{ backgroundColor: color.secondary }}
            className={`${styles.secondary} ${styles.colorBox}`}
            onClick={() => {
              setWhichColor("secondary");
              colorRef.current.click();
            }}
          ></div>
          <TbArrowsDiagonal2
            onClick={() => dispatch({ type: "TOGGLE_COLOR" })}
            className={styles.switchColor}
          />
        </section>
        <Button onClick={horizontalMirrorHandler}>H</Button>
      </div>
      {/* <section className={styles.allButtons}>
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
      </section> */}
    </div>
  );
}
export default Controls;
