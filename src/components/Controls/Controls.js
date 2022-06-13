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
        {/* <section data-tooltip="Paint Bucket">
          <img
            className={`${styles.drawControlImage} ${
              allControl.flood && styles.checked
            }`}
            alt="paintbucket"
            src={paintBucket}
            // onClick={}
          />

          <input
            style={{ display: "none" }}
            ref={floodfillRef}
            checked={allControl.flood}
            onChange={(e) => floodfillHandler(e)}
            id="flood"
            type="checkbox"
          />
        </section> */}

        {/* <section data-tooltip="Freeshand">
          <img
            className={`${styles.drawControlImage} ${
              allControl.pencil && styles.checked
            }`}
            alt="pencil"
            src={pencil}
            onClick={() => pencilRef.current.click()}
          />

          <input
            style={{ display: "none" }}
            ref={pencilRef}
            checked={allControl.pencil}
            onChange={(e) => pencilHandler(e)}
            id="flood"
            type="checkbox"
          />
        </section> */}
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
        {/* <section data-tooltip="Eraser">
          <img
            className={`${styles.drawControlImage} ${
              allControl.eraser && styles.checked
            }`}
            alt="eraser"
            src={eraser}
            onClick={() => eraserRef.current.click()}
          />
          <input
            style={{ display: "none" }}
            ref={eraserRef}
            onChange={(e) => eraserHandler(e)}
            id="eraser"
            checked={allControl.eraser}
            type="checkbox"
          />
        </section> */}
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
        {/* <section data-tooltip="Line">
          <img
            className={`${styles.drawControlImage} ${
              allControl.line && styles.checked
            }`}
            alt="line"
            src={diagonalLine}
            onClick={() => lineRef.current.click()}
          />

          <input
            ref={lineRef}
            style={{ display: "none" }}
            onChange={(e) => lineHandler(e)}
            id="line"
            checked={allControl.line}
            type="checkbox"
          />
        </section> */}
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
        {/* <section data-tooltip="ellipse">
          <img
            className={`${styles.drawControlImage} ${
              allControl.ellipse && styles.checked
            }`}
            alt="ellipse"
            src={ellipse}
            onClick={() => ellipseRef.current.click()}
          />

          <input
            ref={ellipseRef}
            style={{ display: "none" }}
            onChange={(e) => ellipseHandler(e)}
            id="line"
            checked={allControl.ellipse}
            type="checkbox"
          />
        </section> */}
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
        {/* <section data-tooltip="Color Picker" className={styles.colorPicker}>
          <img
            src={colorWheel}
            alt="colorwheel"
            onClick={() => colorRef.current.click()}
          />

          <input
            ref={colorRef}
            style={{ display: "none" }}
            onChange={(e) => colorHandler(e)}
            type="color"
            id="colorpicker"
          />
        </section> */}
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
      {/* <section>
        <button
          onClick={() => {
            const image = canvasRef

              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
            const anchor = document.createElement("a");
            anchor.href = image;
            anchor.download = "img.png";
            anchor.click();
          }}
        >
          download
        </button>
      </section>
      <section>
        <button
          onClick={(e) => {
            startRecord();
          }}
        >
          export
        </button>
      </section> */}
    </div>
  );
}
export default Controls;
