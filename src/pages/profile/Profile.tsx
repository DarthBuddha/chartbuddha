//! # ChartBuddha
//! Page: Profile
//! Description: User Profile page.
//! ##### pages/profile/Profile.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import AppStyles from "../../App.module.css";
import Styles from "./Profile.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Profile: React.FC = () => {
  return (
    <div className={AppStyles.AppContainer}>
      <MenuBar />
      <div className={Styles.ProfilePage}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default Profile;
/*------------------------------------< End-Code >------------------------------------*/
