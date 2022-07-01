import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useState } from "react";
function Modal() {
  return ReactDOM.createPortal(
    <ModalComponent />,
    document.getElementById("overlay")
    );
  }
  export default Modal;
  const ModalComponent = () => {
    const [fps, setFps] = useState(1);
    const inputChangeHandler=()=>{

    }
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <section>X</section>
        </div>
        <section className={styles.FPS}>
          <h5> select FPS:</h5>
          <input value={fps} onChange={inputChangeHandler} type="number" max={10} />
        </section>
      </div>
    </div>
  );
};
