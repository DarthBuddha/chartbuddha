//! # ChartBuddha
//!
//! Page: MenuBar
//! Description: Main Nav Menu.
//!
//! ##### MenuBar.tsx
//
// React
import React from "react";
import { NavLink } from "react-router-dom";
// CSS Module
import Styles from "./App.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const MenuBar: React.FC = () => {
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
          to="/subscribe"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Subscribe
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Market
        </NavLink>

        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          News
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
