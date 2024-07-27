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
    dispatch({ type: "COLOR", colorVal: e.target.value, color: whichColor });
  };
  const color = useSelector((state) => state.canvas.color);
  const colorRef = useRef();
  const mirror = useSelector((state) => state.canvas.mirror);
  const canvasstate = useSelector((state) => state.canvas);
  const mirrorClickable =
    canvasstate.pencil || canvasstate.eraser || canvasstate.line;
  const onPrimaryClick = () => {
    setWhichColor("primary");
    colorRef.current.click();
  };
  const onSecondaryClick = () => {
    setWhichColor("secondary");
    colorRef.current.click();
  };
  return (
    <section
      className={styles.mainSection}
      // I have to do this because React-tooltip is not campatible with react 18
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => {
        setShowTooltip(false);

        setTimeout(() => setShowTooltip(true), 0);
      }}
    >
      <section className={styles.colorPicker}>
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
          data-tip="Primary Color"
          id="primary"
          tabIndex={0}
          onBlur={() => setShowTooltip(false)}
          onKeyDown={(e) => e.key === "Enter" && onPrimaryClick()}
          onClick={onPrimaryClick}
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
          data-tip="Secondary Color"
          tabIndex={0}
          onBlur={() => setShowTooltip(false)}
          onKeyDown={(e) => e.key === "Enter" && onSecondaryClick()}
          onClick={onSecondaryClick}
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
          data-tip="Switch Primary & Secondary "
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
        tabIndex={0}
        onBlur={() => setShowTooltip(false)}
        data-tip="mirror"
        onKeyDown={(e) =>
          e.key === "Enter" && mirrorClickable
            ? dispatch({ type: "MIRROR" })
            : () => {}
        }
        onClick={() =>
          mirrorClickable ? dispatch({ type: "MIRROR" }) : () => {}
        }
        className={` ${mirror ? styles.mirrorEnabled : styles.mirrorDisabled} ${
          styles.mirror
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
