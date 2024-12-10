//! # ChartBuddha
//! Page: Chart
//! Description: Chart Widget.
//! ##### dashboard/widgets/Chart.tsx
//
// Dependencies
import React from "react";
import Split from "react-split";
// Modules
// CSS
import ChartPanelStyles from "./Chart.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
//
const ChartPanel: React.FC = () => {
  return (
    <div className={ChartPanelStyles.Page}>
      <Split
        className={ChartPanelStyles.Container_Chart}
        sizes={[80, 10, 10]}
        minSize={100}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={ChartPanelStyles.Panel_Chart}>
          <h3>Chart</h3>
          {/* <Chart /> */}
        </div>
        <div className={ChartPanelStyles.Panel_OrderBook}>
          <h3>Order Book</h3>
          {/* <OrderBook /> */}
        </div>
        <div className={ChartPanelStyles.Panel_Volume}>
          <h3>Volume</h3>
          {/* <Volume /> */}
        </div>
      </Split>
    </div>
  );
};

export default ChartPanel;
/*------------------------------------< End-Code >------------------------------------*/
