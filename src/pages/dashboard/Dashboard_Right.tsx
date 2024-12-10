//! # ChartBuddha
//! Page: Trades Panel
//! Description: Trades Panel.
//! ##### dashboard/trades/TradesPanel.tsx
//
// Dependencies
import React from "react";
import Split from "react-split";
// Modules
import TimeSales from "./trades/TimeSales";
// CSS
import Styles from "./Dashboard_Right.module.css";
//
/*--------------------------------------< Page >--------------------------------------*/
const Dashboard_Right: React.FC = () => {
  return (
    <div className={Styles.Dashboard_Right}>
      <Split
        className={Styles.Split}
        sizes={[50, 50]}
        minSize={100}
        expandToMin={true}
        gutterSize={20}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
      >
        <div className={Styles.TimeSales_Widget}>
          <TimeSales title="Large Trades" filter={(trade) => trade.size > 50} />
        </div>

        <div className={Styles.TimeSales_Widget}>
          <TimeSales title="All Trades" filter={null} />
        </div>
      </Split>
    </div >
  );
};

export default Dashboard_Right;
/*------------------------------------< End-Code >------------------------------------*/
