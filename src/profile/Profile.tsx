//! # ChartBuddha
//!
//! Page: Profile
//! Description: User Profile page.
//!
//! -------------------------------------------------------------------------------- !//
//
// React
import React from "react";
// Tauri
// Components
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS Modules
import Style_App from "../App.module.css";
import Style from "./Profile.module.css";
//
/* ---------------------------------------------------------------------------------- */
const Profile: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <MenuBar />
      <div className={Style.Page}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
      <StatusBar />
    </div>
  );
};
//
export default Profile;
/* ---------------------------------------------------------------------------------- */
