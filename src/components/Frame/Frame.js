import { useDispatch, useSelector } from "react-redux";
import styles from "./Frame.module.css";
import tempImage from "../../assets/temp.png";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
function Frame({ image, grid, index }) {
  const gridObj = useSelector((state) => state.canvas.grid);
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const currIndex = useSelector((state) => state.frames.currFrame);

  const dispatch = useDispatch();
  const frameClickHandler = () => {
    if (index === 0) {
      dispatch({ type: "DISABLE_ONION_SCREEN" });
    }
    dispatch({
      type: "FRAME_UPDATE_ADD_CURR_FRAME",
      index: currIndex,
      grid: getCanvasGrid(),
      image: getCanvasImage(),
      newIndex: index,
    });
    // console.log(grid[0]);
    gridObj.addFrame(grid);
  };
  return (
    <li
      className={`${styles.frame} `}
      onClick={frameClickHandler}
    >
      <div className={styles.imageWrapper} >
        <div className={styles.image} style={{ boxShadow: image }}>

        </div>

        {currIndex === index && <div className={styles.index}></div>
        }      </div>
    </li>
  );
}
export default Frame;
