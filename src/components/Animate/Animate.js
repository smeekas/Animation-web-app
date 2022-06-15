import Canvas from "../Canvas/Canvas";
import Controls from "../Controls/Controls";
import FramesNControl from "../FramesNControl/FramesNControl";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./Animate.module.css";
function Animate() {
  return (
    <div className={styles.animate}>
      <Toolbar />
      <div className={styles.core}>
        <Controls />
        <Canvas />
      </div>
      <FramesNControl />
    </div>
  );
}
export default Animate;
