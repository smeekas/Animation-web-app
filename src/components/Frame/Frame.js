import { useDispatch, useSelector } from "react-redux";
import styles from "./Frame.module.css";
import tempImage from "../../assets/temp.png";
import { getCanvasGrid, getCanvasImage } from "../../utils/frame";
function Frame({ image, grid, index }) {
  // console.log(image);
  const gridObj = useSelector((state) => state.canvas.grid);
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const currIndex = useSelector((state) => state.frames.currFrame);

  const dispatch = useDispatch();
  const frameClickHandler = () => {
    if (index === 0) {
      dispatch({ type: "DISABLE_ONION_SCREEN" });
    }
    // console.log(currIndex, index);
    // dispatch({
    //   type: "FRAME_UPDATE",
    //   index: currIndex,
    //   grid: getCanvasGrid(),
    //   image: null,
    // });
    // dispatch({ type: "ADD_CURR_FRAME", index: index });
    dispatch({
      type: "FRAME_UPDATE_ADD_CURR_FRAME",
      index: currIndex,
      grid: getCanvasGrid(),
      image: getCanvasImage(),
      newIndex: index,
    });
    console.log(grid[0]);
    gridObj.addFrame(grid);
  };
  return (
    <li
      className={`${styles.frame} ${
        currIndex === index ? styles.thisFrame : ""
      }`}
      onClick={frameClickHandler}
    >
      <img src={image ? image : tempImage} alt={index} />
      <p className={styles.index}>{index}</p>
    </li>
  );
}
export default Frame;
