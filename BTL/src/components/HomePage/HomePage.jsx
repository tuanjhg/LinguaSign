import React from "react";
import { Header } from "../Header/Header";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Header UserName="Nguyen Anh Dung" />
      <div className={styles.homePageWrapper}>
        <div className={styles.homePage}>
          {/* Thêm các thành phần, section, banner... tại đây */}
        </div>
      </div>
    </>
  );
};

export default HomePage; 