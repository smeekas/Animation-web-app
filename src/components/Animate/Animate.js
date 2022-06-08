import Canvas from "../Canvas/Canvas";
import Controls from "../Controls/Controls";
import FramesNControl from "../FramesNControl/FramesNControl";
import styles from "./Animate.module.css";
function Animate() {
  return (
    <div className={styles.animate}>
      <Controls />
      <div className={styles.core}>
        <Canvas />
        <FramesNControl />
      </div>
    </div>
  );
}
export default Animate;
