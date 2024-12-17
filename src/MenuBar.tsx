//! # ChartBuddha
//!
//! Page: Menu Bar
//! Description: The Main Menu.
//!
//! ##### MenuBar.tsx
//
// React
import React from "react";
import { NavLink } from "react-router-dom";
// Tauri
import { info } from "@tauri-apps/plugin-log";
// CSS
import Styles from "./MenuBar.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const MenuBar: React.FC = () => {
  info("Menu bar activated");
  return (
    <div className={Styles.MenuBar}>
      <div className={Styles.LeftSection}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </div>
      <div className={Styles.CenterSection}>
        <NavLink
          to="/connect"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Connect
        </NavLink>

        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Market
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          News
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Community
        </NavLink>
      </div>
      <div className={Styles.RightSection}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default MenuBar;
/*------------------------------------< End-Code >------------------------------------*/
