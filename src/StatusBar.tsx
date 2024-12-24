//! # ChartBuddha
//!
//! Page: Status Bar
//! Description: Main status bar.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
import { NavLink } from "react-router-dom";
// CSS Module
import Style_App from "./App.module.css";
//
/* ---------------------------------------------------------------------------------- */
const StatusBar: React.FC = () => {
  return (
    <div className={Style_App.StatusBar}>
      <div className={Style_App.LeftSection}></div>
      <div className={Style_App.CenterSection}></div>
      <div className={Style_App.RightSection}>
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
//
export default StatusBar;
/* ---------------------------------------------------------------------------------- */
