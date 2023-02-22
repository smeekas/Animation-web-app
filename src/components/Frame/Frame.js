import { useDispatch, useSelector } from "react-redux";
import styles from "./Frame.module.css";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
function Frame({ image, grid, index }) {
  const gridObj = useSelector((state) => state.canvas.grid);
  const currIndex = useSelector((state) => state.frames.currFrame);

  const dispatch = useDispatch();
  const frameClickHandler = () => {
    if (index === 0) {
      dispatch({ type: "DISABLE_ONION_SCREEN" });
    }
      // dispatch({
      //         type: "CURRENT_FRAME_UPDATE", payload: {
      //           grid: getCanvasGrid(),
      //           image: getCanvasImage(),
      //         }
      //       })
    dispatch({
      type: "FRAME_UPDATE_ADD_CURR_FRAME",
      index: currIndex,
      grid: getCanvasGrid(),
      image: getCanvasImage(),
      newIndex: index,
    });
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
