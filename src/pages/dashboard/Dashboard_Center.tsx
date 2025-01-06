//! # ChartBuddha
//! Page: Page Name
//! Description: Short description of the page.
//! ##### pages/connect/panel/right.tsx
//
// Dependencies
import React from 'react';
import Split from 'react-split';
// Modules
// CSS
import Styles from './Dashboard_Center.module.css';
//
/*--------------------------------------< Page >--------------------------------------*/
const Dashboard_Center: React.FC = () => {
  return (
    <div className={Styles.Dashboard_Center}>
      <div className={Styles.Container_Provider}>
        <p>Provider Drop-down-menu ---</p>
        <p>Selected Product ---</p>
        <p>Button_Connect</p>
      </div>
      <Split
        className={Styles.Split}
        sizes={[80, 10, 10]}
        minSize={20}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Styles.Chart}>
          <h3>Chart</h3>
          {/* <Chart /> */}
        </div>
        <div className={Styles.OrderBook}>
          <h3>Order Book</h3>
          {/* <OrderBook /> */}
        </div>
        <div className={Styles.Volume}>
          <h3>Volume</h3>
          {/* <Volume /> */}
        </div>
      </Split>
    </div>
  );
};

export default Dashboard_Center;
/*------------------------------------< End-Code >------------------------------------*/
