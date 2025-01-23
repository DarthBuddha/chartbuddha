/* ---------------------------------------------------------------------------------------------- */
//! - pages/dashboard/Dashboard.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
import Split from 'react-split';
// Components
import DashboardChart from './DashboardChart';
import DashboardSubs from './DashboardSubs';
import DashboardTrades from './DashboardTrades';
// CSS Modules
import Styles from './Dashboard.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Dashboard: React.FC = () => {
  return (
    <div className={Styles.Dashboard}>
      <Split
        className={Styles.Split}
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
        <div className={Styles.DashboardSubs}>
          <DashboardSubs />
        </div>
        <div className={Styles.DashboardChart}>
          <DashboardChart />
        </div>
        <div className={Styles.DashboardTrades}>
          <DashboardTrades />
        </div>
      </Split>
    </div>
  );
};

export default Dashboard;

/* ---------------------------------------------------------------------------------------------- */
