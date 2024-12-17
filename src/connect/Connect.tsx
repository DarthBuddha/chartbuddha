//! # ChartBuddha
//! Page: Connect
//! Description: Connect to various data providers.
//! ##### pages/connect/Connect.tsx
//
// Dependencies
import React from 'react';
import Split from "react-split";
// Modules
import MenuBar from "../MenuBar";
import StatusBar from "../StatusBar";
import Connect_Center from "./Connect_Center";
import Connect_Left from "./Connect_Left";
import Connect_Right from "./Connect_Right";
// CSS
import AppStyle from "../App.module.css";
import Style from "./Connect.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Dashboard: React.FC = () => {
  return (
    <div className={AppStyle.AppContainer}>
      <MenuBar />
      <Split className={Style.Connect_Page_Split}
        sizes={[10, 80, 10]}
        minSize={300}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.ConnectLeftPanel}>
          <Connect_Left />
        </div>
        <div className={Style.ConnectCenterPanel}>
          <Connect_Center />
        </div>
        <div className={Style.ConnectRightPanel}>
          <Connect_Right />
        </div>
      </Split>
      <StatusBar />
    </div>
  );
};
//
export default Dashboard;
/*------------------------------------< End-Code >------------------------------------*/
