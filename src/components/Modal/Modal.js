import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startRecord } from "../../utils/export";
function Modal(props) {
  return ReactDOM.createPortal(
    <ModalComponent {...props} />,
    document.getElementById("overlay")
  );
}
export default Modal;
const ModalComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [fps, setFps] = useState(1);
  const inputChangeHandler = (e) => {
    const framesPerSecond = +e.target.value;
    dispatch({ type: "FPS", fps: framesPerSecond });
    setFps(framesPerSecond);
  };
  const modalCloseHandler = () => {
    closeModal(false);
  };
  const exportHandler = () => {
    startRecord();
  };
  useEffect(() => {
    const modalEle = document.getElementById("modal");
    const list = modalEle?.querySelectorAll(
      "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
    );
    let curr = 1;
    console.log(list);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          curr--;
          list[(curr + list.length * 10) % list.length].focus();
        } else {
          curr++;
          list[curr % list.length].focus();
        }
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }, []);
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} id="modal">
        <div className={styles.header}>
          <section
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === "Enter" && modalCloseHandler()}
            onClick={modalCloseHandler}
          >
            X
          </section>
        </div>
        <section className={styles.FPS}>
          <h5> Select FPS: {fps}</h5>
          <input
            className={styles.slider}
            min={1}
            value={fps}
            onChange={inputChangeHandler}
            type="range"
            max={25}
          />
          <button onClick={exportHandler} className={styles.btn}>
            Export
          </button>
        </section>
      </div>
    </div>
  );
};
