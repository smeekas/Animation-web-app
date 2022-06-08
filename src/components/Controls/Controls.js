import { useDispatch, useSelector } from "react-redux";
import whammy from "react-whammy";
import { startRecord } from "../../utils/export";
import styles from "./Controls.module.css";
function Controls() {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
  const grid = useSelector((state) => state.canvas.grid);
  const allFrames = useSelector((state) => state.frames.frames);
  const colorHandler = (e) => {
    dispatch({ type: "COLOR", value: e.target.value });
  };
  const floodfillHandler = (e) => {
    dispatch({ type: "FLOODFILL", value: e.target.checked });
  };
  const eraserHandler = (e) => {
    dispatch({ type: "ERASER", value: e.target.checked });
  };

  return (
    <div className={styles.controls}>
      <section>
        <p>color: </p>
        <input
          onChange={(e) => colorHandler(e)}
          type="color"
          id="colorpicker"
        />
      </section>
      <section>
        <p>flood fill: </p>
        <input
          onChange={(e) => floodfillHandler(e)}
          id="flood"
          value="on"
          type="checkbox"
        />
      </section>
      <section>
        <p>eraser: </p>
        <input
          onChange={(e) => eraserHandler(e)}
          id="eraser"
          value="on"
          type="checkbox"
        />
      </section>

      <section>
        <button
          onClick={() => {
            const image = canvasRef
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
            const anchor = document.createElement("a");
            anchor.href = image;
            anchor.download = "img.png";
            anchor.click();
          }}
        >
          download
        </button>
      </section>
      <section>
        <button
          onClick={(e) => {
            startRecord();
          }}
        >
          export
        </button>
      </section>
    </div>
  );
}
export default Controls;
