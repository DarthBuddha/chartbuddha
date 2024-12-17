//! # ChartBuddha
//! Page: About
//! Description: About page.
//! ##### pages/about/About.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import AppStyle from "../App.module.css";
import Style from "./About.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const About: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <h1>About</h1>
      <div className={Style.AboutPage}>
        <p>About page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default About;
/*------------------------------------< End-Code >------------------------------------*/
