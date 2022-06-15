import { forwardRef } from "react";
import styles from "./Control.module.css";
const Control = forwardRef(
  ({ tooltipName, imgSrc, imgAlt, onClick, checked, onChange, type }, ref) => {
    return (
      <section data-tooltip={tooltipName}>
        <img
          className={`${styles.drawControlImage} ${checked && styles.checked}`}
          alt={imgAlt}
          src={imgSrc}
          onClick={onClick}
        />

        <input
          ref={ref}
          style={{ display: "none" }}
          onChange={onChange}
          id="line"
          checked={checked}
          type={type}
        />
      </section>
    );
  }
);
export default Control;
