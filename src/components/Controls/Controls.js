import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import eraser from "../../assets/eraser.png";
import pencil from "../../assets/pencil.png";
import paintBucket from "../../assets/paintBucket.png";
import diagonalLine from "../../assets/diagonalLine.png";
import colorWheel from "../../assets/colorWheel.png";
import { startRecord } from "../../utils/export";
import styles from "./Controls.module.css";
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
  return (
    <div className={styles.controls}>
      <div className={styles.drawControl}>
        <section data-tooltip="Paint Bucket">
          <img
            className={`${styles.drawControlImage} ${
              allControl.flood && styles.checked
            }`}
            alt="paintbucket"
            src={paintBucket}
            onClick={() => floodfillRef.current.click()}
          />

          <input
            style={{ display: "none" }}
            ref={floodfillRef}
            checked={allControl.flood}
            onChange={(e) => floodfillHandler(e)}
            id="flood"
            type="checkbox"
          />
        </section>

        <section data-tooltip="Freeshand">
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
        </section>

        <section data-tooltip="Eraser">
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
        </section>
        <section data-tooltip="Line" className="line">
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
        </section>
        <section data-tooltip="Color Picker" className={styles.colorPicker}>
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
        </section>
        <section style={{backgroundColor:allControl.color}} className={styles.preview}>
              
        </section>

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
