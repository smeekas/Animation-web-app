import styles from "./Tool.module.css";
const Tool = (props) => {
  return (
    <div onClick={props.onClick ? props.onClick : null} className={styles.tool}>
      {props.children}
    </div>
  );
};
export default Tool;
