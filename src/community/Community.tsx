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
import AppStyle from "../App.module.css";
import Style from "./Community.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Community: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <div className={Style.CommunityPage}>
        <h1>Community</h1>
        <p>Community Page.</p>
      </div>
      <StatusBar />
    </div>
  );
};

export default Community;
/*------------------------------------< End-Code >------------------------------------*/
