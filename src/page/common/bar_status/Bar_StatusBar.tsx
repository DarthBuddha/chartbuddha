//! # Bar - StatusBar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
import { NavLink } from "react-router-dom";
// CSS Module
import Style from "./Bar_StatusBar.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
const Bar_StatusBar: React.FC = () => {
  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}></div>
      <div className={Style.CenterSection}></div>
      <div className={Style.RightSection}>
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button}>
          About
          </div>
        </NavLink>
      </div>
    </div>
  );
};
//
export default Bar_StatusBar;
/* ------------------------------------------------------------------------------------------------------------------ */
