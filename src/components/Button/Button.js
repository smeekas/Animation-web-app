import styles from "./Button.module.css";
function Button(props) {
  return (
    <button
      disabled={props.disabled ? props.disabled : false}
      className={
        props.className ? `${props.className} ${styles.button}` : styles.button
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
export default Button;
