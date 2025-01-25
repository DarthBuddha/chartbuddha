/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Component: App Pages Dashboard - DashboardChart
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Dashboard chart component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/dashboard/DashboardChart.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import Split from 'react-split'
// CSS Modules
import Styles from './DashboardChart.module.css'

/* ---------------------------------------------------------------------------------------------- */

const DashboardChart: React.FC = () => {
  return (
    <div className={Styles.Dashboard_Center}>
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
  )
}

export default DashboardChart

/* ---------------------------------------------------------------------------------------------- */
