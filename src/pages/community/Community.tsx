//! # ChartBuddha
//! Page: Community
//! Description: Community page.
//! ##### pages/community/Community.tsx
//
// Dependencies
import React from "react";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
// CSS
import AppStyles from "../../App.module.css";
import Styles from "./Community.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Community: React.FC = () => {
  return (
    <div className={AppStyles.AppContainer}>
      <MenuBar />
      <div className={Styles.CommunityPage}>
        <h1>Community</h1>
        <p>Community Page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default Community;
/*------------------------------------< End-Code >------------------------------------*/
