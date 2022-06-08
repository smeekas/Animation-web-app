import { useDispatch, useSelector } from "react-redux";
import Frame from "../Frame/Frame";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
import styles from "./FramesNControl.module.css";
import { Children } from "react";
function FramesNControl() {
  const allFrames = useSelector((state) => state.frames.frames);
  // const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const currIndex = useSelector((state) => state.frames.currFrame);
  // const gridObj = useSelector((state) => state.canvas.grid);
  const dispatch = useDispatch();
  // console.log(allFrames[0]?.grid[0]);
  const frameAddHandler = () => {
    // const image = canvasRef
    //   .toDataURL("image/png")
    //   .replace("image/png", "image/octet-stream");
    const gridArr = getCanvasGrid();
    const image = getCanvasImage();
    // const newGrid = [];
    // for (let i = 0; i < gridArr.length; i++) {
    //   newGrid.push([]);
    //   for (let j = 0; j < gridArr[i].length; j++) {
    //     newGrid[i].push(gridArr[i][j]);
    //   }
    // }
    // console.l*-+og(newGrid[0]);
    dispatch({
      type: "FRAME_ADD",
      payload: { image: image, grid: gridArr },
    });
  };
  
  // console.log(currIndex, allFrames.length - 1);
  return (
    <div className={styles.frames}>
      <button
        disabled={currIndex !== allFrames.length - 1}
        onClick={frameAddHandler}
      >
        Add frame
      </button>

      <div className={styles.allFrames}>
        {allFrames.map((frame, index) => {
          // console.log(index, frame.image);
          return (
            <Frame
              index={index}
              key={index}
              image={frame.image}
              grid={frame.grid}
            />
          );
        })}
      </div>
    </div>
  );
}
export default FramesNControl;
