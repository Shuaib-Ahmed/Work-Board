import React from "react";
import styles from "./css/popUp.module.css";

const PopUp = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};

export default PopUp;
