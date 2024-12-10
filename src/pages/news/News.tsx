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
import AppStyles from "../../App.module.css";
import Styles from './News.module.css';
//
/*--------------------------------------< Page >--------------------------------------*/
const News: React.FC = () => {
  return (
    <div className={AppStyles.AppContainer}>
      <MenuBar />
      <div className={Styles.NewsPage}>
        <h1>News</h1>
        <p>News page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default News;
/*------------------------------------< End-Code >------------------------------------*/
