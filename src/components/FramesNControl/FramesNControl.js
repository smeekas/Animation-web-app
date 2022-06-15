import { useDispatch, useSelector } from "react-redux";
import Frame from "../Frame/Frame";
import { copyGrid, getCanvasGrid, getCanvasImage } from "../../utils/frame";
import styles from "./FramesNControl.module.css";
import { useEffect } from "react";
import Button from "../Button/Button";
function FramesNControl() {
  const allFrames = useSelector((state) => state.frames.frames);
  const currIndex = useSelector((state) => state.frames.currFrame);
  const historyObj = useSelector((state) => state.undo);
  const gridObj = useSelector((state) => state.canvas.grid);
  const dispatch = useDispatch();
  const frameAddHandler = () => {
    const gridArr = getCanvasGrid();
    const image = getCanvasImage();
    console.log();
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
  const undoHandler = () => {
    const historyIndex = historyObj.history[currIndex].curr;
    // console.log(historyIndex);
    // console.log(historyObj.history[currIndex].grid[historyIndex]);
    gridObj.drawFrame(historyObj.history[currIndex].grid[historyIndex]);
    dispatch({ type: "UNDO_POP", index: currIndex });
  };
  return (
    <div className={styles.frames}>
      <Button
        disabled={currIndex !== allFrames.length - 1}
        onClick={frameAddHandler}
      >
        Add Frame
      </Button>
      <Button disabled={currIndex === 0} onClick={copyPreviousFrame}>
        Copy previous Frame
      </Button>
      <Button disabled={currIndex === 0} onClick={onionSkin}>
        onion skin
      </Button>
      <Button onClick={undoHandler}>undo</Button>
      <ul className={styles.allFrames}>
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
      </ul>
    </div>
  );
}
export default FramesNControl;
