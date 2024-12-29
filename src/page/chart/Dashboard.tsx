//! # Chart
//!
/* ------------------------------------------------------------------------------------------------------------------ */
// React
import React from "react";
import Split from "react-split";
// Components
import Bar_MenuBar from "../common/bar_menu/Bar_MenuBar";
import Bar_StatusBar from "../common/bar_status/Bar_StatusBar";
import Dashboard_Center from "./Dashboard_Center";
import Dashboard_Left from "./Dashboard_Left";
import Dashboard_Right from "./Dashboard_Right";
// CSS Modules
import Styles from "./Dashboard.module.css";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Dashboard: React.FC = () => {
  return (
    <div className={Styles.Dashboard_Page}>
      <Bar_MenuBar />
      <Split className={Styles.Split}
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
        <div className={Styles.Dashboard_Left}>
          <Dashboard_Left />
        </div>
        <div className={Styles.Dashboard_Center}>
          <Dashboard_Center />
        </div>
        <div className={Styles.Dashboard_Right}>
          <Dashboard_Right />
        </div>
      </Split>
      <Bar_StatusBar />
    </div>
  );
};

export default Dashboard;
//
/* ------------------------------------------------------------------------------------------------------------------ */
