//! # Chart
//!
/* ------------------------------------------------------------------------------------------------------------------ */
// React
import React from 'react';
import Split from 'react-split';
// Common
import Menu_Bar from 'common/bar/Menu_Bar';
import Status_Bar from 'common/bar/Status_Bar';
// Components
import Dashboard_Center from './Dashboard_Center';
import Dashboard_Left from './Dashboard_Left';
import Dashboard_Right from './Dashboard_Right';
// CSS Modules
import Styles from './Dashboard.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Dashboard: React.FC = () => {
  return (
    <div className={Styles.Dashboard_Page}>
      <Menu_Bar />
      <Split
        className={Styles.Split}
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
      <Status_Bar />
    </div>
  );
};

export default Dashboard;
//
/* ------------------------------------------------------------------------------------------------------------------ */
