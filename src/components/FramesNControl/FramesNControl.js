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
  const showScreen = useSelector((state) => state.onion.showScreen);
  const gridObj = useSelector((state) => state.canvas.grid);
  const dispatch = useDispatch();
  const frameAddHandler = async () => {
    const gridArr = getCanvasGrid();
    const image = await getCanvasImage();
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
      gridObj.addFrame(allFrames[1].grid);

      dispatch({ type: "DELETE_FRAME" });

      return;
    } else {
      gridObj.addFrame(allFrames[currIndex - 1].grid);
      dispatch({ type: "DELETE_FRAME" });
    }
  };
  const moveFrameLeftHandler = () => {
    if (currIndex === 0) {
      dispatch({ type: "DISABLE_ONION_SCREEN" });
    }
    if (currIndex === 0) {
      return;
    }
    dispatch({ type: "MOVE_FRAME_LEFT" });
  };
  const moveFrameRightHandler = () => {
    if (currIndex === allFrames.length - 1) {
      return;
    }
    dispatch({ type: "MOVE_FRAME_RIGHT" });
  };
  const copyPreviousFrame = () => {
    gridObj.copyFrame(copyGrid(allFrames[currIndex - 1].grid));
  };
  const onionSkin = () => {
    dispatch({ type: "TOGGLE" });
  };

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
        <Button className={styles.frameControlButton} onClick={frameAddHandler}>
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
            <FiTrash2 tabIndex={0} onClick={removeFramehandler} />
          </section>
          <section
            className={`${currIndex === 0 && styles.disabled} ${
              styles.controlFrameIcon
            }`}
          >
            <FiArrowLeft
              tabIndex={0}
              className={currIndex === 0 && styles.disabled}
              onClick={moveFrameLeftHandler}
              onKeyDown={(e) => e.key === "Enter" && moveFrameLeftHandler()}
            />
          </section>
          <section
            className={`${
              currIndex === allFrames.length - 1 && styles.disabled
            } ${styles.controlFrameIcon}`}
          >
            <FiArrowRight
              tabIndex={0}
              className={currIndex === allFrames.length - 1 && styles.disabled}
              onClick={moveFrameRightHandler}
              onKeyDown={(e) => e.key === "Enter" && moveFrameRightHandler()}
            />
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
