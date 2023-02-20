import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRecord } from "../../utils/export";
function Modal(props) {
  return ReactDOM.createPortal(
    <ModalComponent {...props} />,
    document.getElementById("overlay")
  );
}
export default Modal;
const ModalComponent = ({ closeModal }) => {
  const dispatch=useDispatch();
  const [fps, setFps] = useState(1);
  const inputChangeHandler = (e) => {
    const framesPerSecond = +e.target.value;
    dispatch({type:"FPS",fps:framesPerSecond})
    setFps(framesPerSecond);
  };
  const modalCloseHandler = () => {
      closeModal(false);
  };
  const exportHandler = () => {
    startRecord();
  };
  return (
    <div onClick={()=>console.log("back") } className={styles.backdrop}>
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
        
            onClick={exportHandler}
            className={styles.btn}
          >
          Export
          </button>
        </section>
      </div>
    </div>
  );
};
