import { useDispatch, useSelector } from "react-redux";
import Frame from "../Frame/Frame";
import { copyGrid, getCanvasGrid, getCanvasImage } from "../../utils/frame";
import styles from "./FramesNControl.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import { motion } from "framer-motion";
function FramesNControl() {
  const [showFrames, setShowFrames] = useState(true);
  const [frameDisplay, setFrameDisplay] = useState(true);
  const allFrames = useSelector((state) => state.frames.frames);
  const currIndex = useSelector((state) => state.frames.currFrame);
  // const historyObj = useSelector((state) => state.undo);
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
      payload: { image: image, grid: gridArr },
    });
    gridObj.drawBlank();
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
          Frames
        </Button>
        <Button
          className={styles.frameControlButton}
          disabled={currIndex !== allFrames.length - 1}
          onClick={frameAddHandler}
        >
          Add Frame
        </Button>
        <Button
          className={styles.frameControlButton}
          disabled={currIndex === 0}
          onClick={copyPreviousFrame}
        >
          Copy previous Frame
        </Button>
        <Button
          className={styles.frameControlButton}
          disabled={currIndex === 0}
          onClick={onionSkin}
        >
          onion skin
        </Button>
      </div>
      <motion.ul
        onAnimationEnd={() => setFrameDisplay(false)}
        animate={
          showFrames
            ? {
                height: ["0px", "126px"],
              }
            : {}
        }
        style={{ display: frameDisplay ? "flex" : "none" }}
        transition={{ duration: 0.5 }}
        className={styles.allFrames}
      >
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
    </div>
  );
}
export default FramesNControl;
