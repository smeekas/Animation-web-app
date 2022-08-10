import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { startRecord } from "../../utils/export";
function Modal(props) {
  return ReactDOM.createPortal(
    <ModalComponent {...props} />,
    document.getElementById("overlay")
  );
}
export default Modal;
const ModalComponent = ({ closeModal }) => {
  // console.log(closeModal);
  const hide = useSelector((state) => state.export.hide);
  const [fps, setFps] = useState(1);
  const inputChangeHandler = (e) => {
    const framesPerSecond = +e.target.value;
    setFps(framesPerSecond);
  };
  const modalCloseHandler = () => {
    if (!hide) {
      closeModal(false);
    }
  };
  const exportHandler = () => {
    startRecord();
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <section onClick={modalCloseHandler}>X</section>
        </div>
        <section className={styles.FPS}>
          <h5> Select FPS: {fps}</h5>

          {/* <div className={styles.sliderContainer}> */}
          {/* <div className={styles.rangeLimit}>1</div>{" "} */}
          <input
            className={styles.slider}
            min={1}
            value={fps}
            onChange={inputChangeHandler}
            type="range"
            max={25}
            // step={5}
          />
          {/* <div className={styles.rangeLimit}>25</div> */}
          {/* </div> */}
          <button
            disabled={hide}
            onClick={exportHandler}
            className={styles.btn}
          >
            {!hide ? "Export" : "Exporting"}
          </button>
        </section>
      </div>
    </div>
  );
};
