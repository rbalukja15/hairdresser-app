import React from "react";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      Copyright &copy; {new Date().getFullYear()} <strong> mbalukja</strong>
    </div>
  );
};

export default Footer;
