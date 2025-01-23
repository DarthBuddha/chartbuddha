/* ---------------------------------------------------------------------------------------------- */
//! # Component: App Pages Dashboard - DashboardTrades
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Dashboard trades component for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/dashboard/DashboardTrades.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import Split from 'react-split'
// Components
import TimeSales from './trades/Trades.tsx'
// CSS Modules
import Styles from './DashboardTrades.module.css'

/* ---------------------------------------------------------------------------------------------- */

const DashboardTrades: React.FC = () => {
  return (
    <div className={Styles.DashboardTrades}>
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
        <div className={Styles.TradesWidget}>
          <TimeSales title="Large Trades" filter={(trade) => trade.size > 50} />
        </div>

        <div className={Styles.TradesWidget}>
          <TimeSales title="All Trades" filter={null} />
        </div>
      </Split>
    </div>
  )
}

export default DashboardTrades

/* ---------------------------------------------------------------------------------------------- */
