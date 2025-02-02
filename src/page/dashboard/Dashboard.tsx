/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Dashboard - Dashboard
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Dashboard page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/dashboard/Dashboard.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import Split from 'react-split'
// Components
import MenuBar from '../components/MenuBar.tsx'
import StatusBar from '../components/StatusBar.tsx'
import DashboardChart from './DashboardChart.tsx'
import DashboardSubs from './DashboardSubs.tsx'
import DashboardTrades from './DashboardTrades.tsx'
// CSS Module
import Style from './css/Dashboard.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Dashboard: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}>
        <MenuBar />
      </div>
      <Split
        className={Style.Split}
        sizes={[10, 80, 10]}
        minSize={[10, 300, 10]}
        maxSize={[300, Infinity, 300]}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.DashboardSubs}>
          <DashboardSubs />
        </div>
        <div className={Style.DashboardChart}>
          <DashboardChart />
        </div>
        <div className={Style.DashboardTrades}>
          <DashboardTrades />
        </div>
      </Split>
      <div className={Style.Component_StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Dashboard

/* ---------------------------------------------------------------------------------------------- */
