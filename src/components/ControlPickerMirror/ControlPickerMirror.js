import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import styles from "./ControlPickerMirror.module.css";
import { TbArrowsDiagonal2 } from "react-icons/tb";
import ReactTooltip from "react-tooltip";
function ControlPickerMirror() {
  const dispatch = useDispatch();
  const [whichColor, setWhichColor] = useState(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const colorHandler = (e) => {
    console.log(e.target.value);
    dispatch({ type: "COLOR", colorVal: e.target.value, color: whichColor });
  };
  const color = useSelector((state) => state.canvas.color);
  const colorRef = useRef();
  const mirror = useSelector((state) => state.canvas.mirror);
  const canvasstate = useSelector((state) => state.canvas);
  const mirrorClickable =
    canvasstate.pencil || canvasstate.eraser || canvasstate.line;
  return (
    <section
      className={styles.mainSection}
      // I have to do this because React-tooltip is not campatible with react 18
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => {
        setShowTooltip(false);

        setTimeout(() => setShowTooltip(true), 0);
      }}
      //----------------------------------------------
    >
      <section
        // style={{ backgroundColor: allControl.color }}
        className={styles.colorPicker}
      >
        <input
          onChange={(e) => colorHandler(e)}
          style={{ visibility: "hidden" }}
          type="color"
          ref={colorRef}
        />
        <div
          style={{ backgroundColor: color.primary }}
          className={`${styles.primary} ${styles.colorBox}`}
          // I have to do this because React-tooltip is not campatible with react 18
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);

            setTimeout(() => setShowTooltip(true), 0);
          }}
          //----------------------------------------------
          data-for="main"
          data-tip="primary color"
          id="primary"
          onClick={() => {
            setWhichColor("primary");
            colorRef.current.click();
          }}
        ></div>
        <div
          style={{ backgroundColor: color.secondary }}
          className={`${styles.secondary} ${styles.colorBox}`}
          id="secondary"
          // I have to do this because React-tooltip is not campatible with react 18
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);

            setTimeout(() => setShowTooltip(true), 0);
          }}
          //----------------------------------------------
          data-for="main"
          data-tip="secondary color"
          onClick={() => {
            setWhichColor("secondary");
            colorRef.current.click();
          }}
        ></div>
        <TbArrowsDiagonal2
          id="arrow"
          // I have to do this because React-tooltip is not campatible with react 18
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);

            setTimeout(() => setShowTooltip(true), 0);
          }}
          //----------------------------------------------
          data-for="main"
          data-tip="switch primary & secondary "
          onClick={() => dispatch({ type: "TOGGLE_COLOR" })}
          className={styles.switchColor}
        />
      </section>
      <section
        // I have to do this because React-tooltip is not campatible with react 18
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          setShowTooltip(false);

          setTimeout(() => setShowTooltip(true), 0);
        }}
        //----------------------------------------------
        data-for="main"
        data-tip="mirror"
        onClick={() =>
          mirrorClickable ? dispatch({ type: "MIRROR" }) : () => {}
        }
        className={`${styles.mirror} ${
          mirror ? styles.mirrorEnabled : styles.mirrorDisabled
        }`}
      >
        <div className={styles.mirrorDot}></div>
        <div className={styles.mirrorDot}></div>
      </section>
      {showTooltip && <ReactTooltip place="right" id="main" />}
    </section>
  );
}
export default ControlPickerMirror;
