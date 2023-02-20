import Tippy from "@tippyjs/react";
import { useState } from "react";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import styles from "./Control.module.css";
const Control = forwardRef(
  ({ tooltipName, imgSrc, imgAlt, onClick, checked, onChange, type }, ref) => {
    const [showTooltip, setShowTooltip] = useState(true);
    const tooltip = useSelector((state) => state.tooltip);
    // console.log(tooltip.x);
    const dispatch = useDispatch();

    return (
      <section
        data-for={tooltipName}
        data-tip={tooltipName}
        data-iscapture="true"
        className={styles.control}
        //----------------------------------------------
        // I have to do this because React-tooltip is not campatible with react 18
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          setShowTooltip(false);

          setTimeout(() => setShowTooltip(true), 0);
        }}
        //----------------------------------------------
      >
        {imgSrc && (
          <img
            className={`${styles.drawControlImage} ${
              checked && styles.checked
            }`}
            alt={imgAlt}
            src={imgSrc}
            onClick={onClick}
          />
        )}
        {/* {tooltip.name === tooltipName && (
          <div
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className={styles.tooltip}
          >
            {tooltip.x} {tooltip.y}
          </div>
        )} */}
        <input
          ref={ref}
          style={{ display: "none" }}
          onChange={onChange}
          id="line"
          checked={checked}
          type={type}
        />
        {showTooltip && (
          <ReactTooltip id={tooltipName} place="right" effect="float" />
        )}
      </section>
    );
  }
);
export default Control;
