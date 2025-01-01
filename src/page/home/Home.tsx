//! # Home
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/Menu_Bar';
import Status_Bar from 'common/bar/Status_Bar';
// CSS Modules
import Style from './Home.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Home: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
        <p>This is your home page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Home;
//
/* ------------------------------------------------------------------------------------------------------------------ */
