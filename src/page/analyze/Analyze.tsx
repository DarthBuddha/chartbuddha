//! # Analyze
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/Menu_Bar';
import Status_Bar from 'common/bar/Status_Bar';
// CSS Modules
import Style_App from 'common/App_Window.module.css';
import Style from './Analyze.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Analyze: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Menu_Bar />
      <div className={Style.Page}>
        <h1>Analyze</h1>
        <p>Analyze page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Analyze;
//
/* ------------------------------------------------------------------------------------------------------------------ */
