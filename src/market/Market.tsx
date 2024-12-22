//! # ChartBuddha
//! Page: News
//! Description: News page.
//! ##### pages/news/News.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import Styles from "./Market.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Market: React.FC = () => {
  return (
    <div className={Styles.AppContainer}>
      <MenuBar />
      <div className={Styles.NewsPage}>
        <h1>News</h1>
        <p>News page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default Market;
/*------------------------------------< End-Code >------------------------------------*/
