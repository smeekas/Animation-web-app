import Tool from "../Tool/Tool";
import styles from "./Toolbar.module.css";
import { useSelector } from "react-redux";
import { startRecord } from "../../utils/export";

function Toolbar() {
  const allFrames = useSelector((state) => state.frames.frames);
  const canvasRef = useSelector((state) => state.canvas.canvasRef);
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
    startRecord();
  };
  return (
    <div className={styles.toolbar}>
      <Tool onClick={downloadAllFrames}>Download All Frames</Tool>
      <Tool onClick={downloadThisFrame}>Download This Frame</Tool>

      <Tool onClick={exportHandler}>export</Tool>
      <Tool>undo</Tool>
      <Tool>redo</Tool>
    </div>
  );
}
export default Toolbar;
