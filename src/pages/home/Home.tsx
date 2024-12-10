//! # ChartBuddha
//! Page: Home
//! Description: Home page of ChartBuddha.
//! ##### pages/home/Home.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import AppStyle from "../../App.module.css";
import Style from "./Home.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Home: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <div className={Style.HomePage}>
        <h1>Welcome to ChartBuddha</h1>
        <p>This is your home page.</p>
      </div>
      <StatusBar />
    </div >
  );
};

export default Home;
/*------------------------------------< End-Code >------------------------------------*/
