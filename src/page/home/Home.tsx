//! # Home
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
// Tauri
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
// CSS Modules
import Style from "./Home.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Home: React.FC = () => {
  return (
    <div className={Style.Home_Page}>
      <Bar_MenuBar />
      <div className={Style.Main_Content}>
        <h1>Welcome to ChartBuddha</h1>
        <p>This is your home page.</p>
      </div>
      <Bar_StatusBar />
    </div >
  );
};

export default Home;
//
/* ------------------------------------------------------------------------------------------------------------------ */
