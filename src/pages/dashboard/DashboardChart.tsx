/* ------------------------------------------------------------------------------------------------------------------ */
//! pages/dashboard/DashboardChart.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import React from 'react';
import Split from 'react-split';
// CSS Modules
import Styles from './DashboardChart.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */

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
        minSize={[100, 100, 100]}
        maxSize={[Infinity, 300, 300]}
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

/* ------------------------------------------------------------------------------------------------------------------ */
