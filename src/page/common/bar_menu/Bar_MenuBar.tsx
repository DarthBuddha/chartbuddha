//! # Bar - MenuBar
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from "react";
import { NavLink } from "react-router-dom";
// CSS Module
import Style from "./Bar_MenuBar.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Bar_MenuBar: React.FC = () => {
  return (
    <div className={Style.Menu_Container}>
      <div className={Style.LeftSection}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Profile}>
          Home
          </div>
        </NavLink>
      </div>
      <div className={Style.CenterSection}>
        <NavLink
          to="/connect"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Menu}>
          Connect
          </div>
        </NavLink>

        <NavLink
          to="/subscribe"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Menu}>
          Subscribe
          </div>
        </NavLink>

        <NavLink
          to="/chart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Menu}>
          Chart
          </div>
        </NavLink>

        <NavLink
          to="/analyze"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Menu}>
          Analyze
          </div>
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Menu}>
          News
          </div>
        </NavLink>
      </div>
      <div className={Style.RightSection}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className={Style.Nav_Button_Profile}>
          Profile
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Bar_MenuBar;
//
/* ------------------------------------------------------------------------------------------------------------------ */
