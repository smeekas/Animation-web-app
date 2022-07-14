import Button from "../Button/Button";
import styles from "./Toolbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { startRecord } from "../../utils/export";
import Modal from "../Modal/Modal";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useState } from "react";
function Toolbar() {
  const [showModal, setShowModal] = useState(false);
  const allFrames = useSelector((state) => state.frames.frames);
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const dispatch = useDispatch();
  const currIndex = useSelector((state) => state.frames.currFrame);
  const historyObj = useSelector((state) => state.undo);
  const gridObj = useSelector((state) => state.canvas.grid);
  const downloadAllFrames = () => {
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
  };
  const downloadThisFrame = () => {
    const image = canvasRef
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    const anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = "img.png";
    anchor.click();
  };
  const exportHandler = () => {
    setShowModal(true);
    // startRecord();
  };
  const undoHandler = () => {
    const historyIndex = historyObj.history[currIndex].curr;
    // console.log(historyIndex);
    // console.log(historyObj.history[currIndex].grid[historyIndex]);
    gridObj.addFrame(historyObj.history[currIndex].grid[historyIndex]);
    dispatch({ type: "UNDO_POP", index: currIndex });
  };
  const redoHandler = () => {
    const historyIndex = historyObj.history[currIndex].curr;
    console.log(historyIndex, historyObj.history[currIndex].grid.length);
    // console.log(historyIndex);
    // console.log(historyObj.history[currIndex].grid[historyIndex]);
    gridObj.addFrame(historyObj.history[currIndex].grid[historyIndex + 2]);
    dispatch({ type: "REDO_PUSH", index: currIndex });
  };

  return (
    <div className={styles.toolbar}>
      {showModal && <Modal />}
      <Button className={styles.tool} onClick={downloadAllFrames}>
        Download All Frames
      </Button>
      <Button className={styles.tool} onClick={downloadThisFrame}>
        Download This Frame
      </Button>

      <Button className={styles.tool} onClick={exportHandler}>
        Export
      </Button>
      <Button
        className={styles.tool}
        disabled={
          historyObj.history[currIndex]
            ? !historyObj.history[currIndex].canUndo
            : true
        }
        onClick={undoHandler}
      >
        <FaUndo className={styles.toolIcon} />
        Undo
      </Button>
      <Button
        className={styles.tool}
        disabled={
          historyObj.history[currIndex]
            ? !historyObj.history[currIndex].canRedo
            : true
        }
        onClick={redoHandler}
      >
        Redo <FaRedo className={styles.toolIcon} />
      </Button>
    </div>
  );
}
export default Toolbar;
