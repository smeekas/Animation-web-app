import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import eraser from "../../assets/eraser.png";
import pencil from "../../assets/pencil.png";
import paintBucket from "../../assets/paintBucket.png";
import diagonalLine from "../../assets/diagonalLine.png";
import ellipse from "../../assets/ellipse.png";
import moveImg from "../../assets/move.png";
import rectangleImg from "../../assets/square.png";
import styles from "./Controls.module.css";
import Control from "../Control/Control";

import ControlPickerMirror from "../ControlPickerMirror/ControlPickerMirror";
function Controls() {
  const dispatch = useDispatch();
  const floodfillRef = useRef();
  const eraserRef = useRef();
  const lineRef = useRef();
  const pencilRef = useRef();
  const ellipseRef = useRef();
  const moveRef = useRef();
  const rectangleRef = useRef();
  const allControl = useSelector((state) => state.canvas);
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
  const rectangleHandler = (e) => {
    dispatch({ type: "RECT", value: e.target.checked });
  };
  const moveHandler = (e) => {
    dispatch({ type: "MOVE", value: e.target.checked });
  };
  return (
    <div className={styles.controls}>
      <div
        className={styles.drawControl}
      >
        <div className={styles.toolName}>TOOLS</div>
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
          tooltipName="Pencil Tool"
          imgSrc={pencil}
          imgAlt="pencil"
          onClick={() => pencilRef.current.click()}
          onChange={(e) => pencilHandler(e)}
          checked={allControl.pencil}
          type="checkbox"
          ref={pencilRef}
        />

        <Control
          tooltipName="Eraser Tool"
          imgSrc={eraser}
          imgAlt="eraser"
          onClick={() => eraserRef.current.click()}
          onChange={(e) => eraserHandler(e)}
          checked={allControl.eraser}
          type="checkbox"
          ref={eraserRef}
        />

        <Control
          tooltipName="Line Tool"
          imgSrc={diagonalLine}
          imgAlt="line"
          onClick={() => lineRef.current.click()}
          onChange={(e) => lineHandler(e)}
          checked={allControl.line}
          type="checkbox"
          ref={lineRef}
        />

        <Control
          tooltipName="Ellipse Tool"
          imgSrc={ellipse}
          imgAlt="ellipse"
          onClick={() => ellipseRef.current.click()}
          onChange={(e) => ellipseHandler(e)}
          checked={allControl.ellipse}
          type="checkbox"
          ref={ellipseRef}
        />
        <Control
          tooltipName="Rectangle Tool"
          imgSrc={rectangleImg}
          imgAlt="rectangleImg"
          onClick={() => rectangleRef.current.click()}
          onChange={(e) => rectangleHandler(e)}
          checked={allControl.rect}
          type="checkbox"
          ref={rectangleRef}
        />
        <Control
          tooltipName="Move Tool"
          imgSrc={moveImg}
          imgAlt="move"
          onClick={() => moveRef.current.click()}
          onChange={(e) => moveHandler(e)}
          checked={allControl.move}
          type="checkbox"
          ref={moveRef}
        />

        <ControlPickerMirror />

      </div>

    </div>
  );
}
export default Controls;
