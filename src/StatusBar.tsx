//! # ChartBuddha
//!
//! Page: Status Bar
//! Description: Main status bar.
//!
//! ##### StatusBar.tsx
//
// Dependencies
import React from "react";
import { NavLink } from "react-router-dom";
// Modules
// CSS
import Styles from "./StatusBar.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const StatusBar: React.FC = () => {
  return (
    <div className={Styles.StatusBar}>
      <div className={Styles.LeftSection}></div>
      <div className={Styles.CenterSection}></div>
      <div className={Styles.RightSection}>
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default StatusBar;
/*------------------------------------< End-Code >------------------------------------*/
