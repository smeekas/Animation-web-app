import { useDispatch, useSelector } from "react-redux";
import Frame from "../Frame/Frame";
import { copyGrid, getCanvasGrid, getCanvasImage } from "../../utils/frame";
import styles from "./FramesNControl.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSquare,
  FiCheckSquare,
  FiPlus,
  FiCopy,
  FiTrash2,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
function FramesNControl() {
  const [showFrames, setShowFrames] = useState(true);
  const [frameDisplay, setFrameDisplay] = useState(true);
  const allFrames = useSelector((state) => state.frames.frames);
  const currIndex = useSelector((state) => state.frames.currFrame);
  // const historyObj = useSelector((state) => state.undo);
  const showScreen = useSelector((state) => state.onion.showScreen);
  const gridObj = useSelector((state) => state.canvas.grid);
  const dispatch = useDispatch();
  const frameAddHandler = () => {
    const gridArr = getCanvasGrid();
    const image = getCanvasImage();
    //TODO: add blank frame first, then change  as we click new frame
    //TODO: handle test cases for clicking oldframe and exporting
    //TODO: feature: download all images, undo, shift to circle, preview, preserve state,  right click to erase
    dispatch({
      type: "FRAME_ADD",
      payload: { image: image, grid: gridArr, currIndex: currIndex },
    });
    gridObj.drawBlank();
  };
  const removeFramehandler = () => {
    if (allFrames.length === 1) {
      return;
    }
    if (currIndex === 0) {
      //TODO
      gridObj.addFrame(allFrames[1].grid);
      // console.log(currIndex);
      dispatch({ type: "DELETE_FRAME" });
      // console.log(currIndex);
      return;
    } else {
      // console.log("remove");
      gridObj.addFrame(allFrames[currIndex - 1].grid);
      dispatch({ type: "DELETE_FRAME" });
    }
  };
  const moveFrameLeftHandler = () => {
    if (currIndex === 1) {
      dispatch({ type: "DISABLE_ONION_SCREEN" });
    }
    dispatch({ type: "MOVE_FRAME_LEFT" });
  };
  const moveFrameRightHandler = () => {
    dispatch({ type: "MOVE_FRAME_RIGHT" });
  };
  const copyPreviousFrame = () => {
    // dispatch({ type: "COPY_PREV_FRAME" });

    // console.log(allFrames[currIndex - 1].grid[0]);

    gridObj.copyFrame(copyGrid(allFrames[currIndex - 1].grid));
  };
  const onionSkin = () => {
    dispatch({ type: "TOGGLE" });
  };

  // console.log(historyObj.history[currIndex]);
  return (
    <div className={styles.frames}>
      <div
        style={
          !frameDisplay ? { position: "fixed", bottom: "0", width: "100%" } : {}
        }
        className={styles.frameControlButtons}
      >
        <Button
          className={styles.frameControlButton}
          onClick={() => {
            setFrameDisplay(true);
            setShowFrames((prev) => !prev);
          }}
        >
          Frames({currIndex + 1}/{allFrames.length})
        </Button>
        <Button
          className={styles.frameControlButton}
          // disabled={currIndex !== allFrames.length - 1}
          onClick={frameAddHandler}
        >
          <FiPlus className={styles.icon} /> Add Frame
        </Button>
        <Button
          className={styles.frameControlButton}
          disabled={currIndex === 0}
          onClick={copyPreviousFrame}
        >
          <FiCopy className={styles.icon} /> Copy Previous Frame
        </Button>
        <Button
          className={styles.frameControlButton}
          disabled={currIndex === 0}
          onClick={onionSkin}
        >
          {!showScreen ? (
            <FiSquare className={styles.icon} />
          ) : (
            <FiCheckSquare className={styles.icon} />
          )}
          Onion Skin
        </Button>
      </div>

      {
        // TODO: controls remove frame  and may be move frame
      }
      <motion.div
        onAnimationEnd={() => setFrameDisplay(false)}
        animate={
          showFrames
            ? {
                height: ["0px", "164px"],
              }
            : {}
        }
        transition={{ duration: 0.5 }}
        style={{ display: frameDisplay ? "flex" : "none" }}
        className={styles.frameAndControl}
      >
        <div className={styles.controlFrame}>
          <section>CONTROLS</section>
          <section className={styles.controlFrameIcon}>
            <FiTrash2 onClick={removeFramehandler} />
          </section>
          <section className={styles.controlFrameIcon}>
            <FiArrowLeft onClick={moveFrameLeftHandler} />
          </section>
          <section className={styles.controlFrameIcon}>
            <FiArrowRight onClick={moveFrameRightHandler} />
          </section>
        </div>
        <motion.ul className={styles.allFrames}>
          {allFrames.map((frame, index) => {
            return (
              <Frame
                index={index}
                key={index}
                image={frame.image}
                grid={frame.grid}
              />
            );
          })}
        </motion.ul>
      </motion.div>
    </div>
  );
}
export default FramesNControl;
