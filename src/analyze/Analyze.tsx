//! # Analyze
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'MenuBar';
import Status_Bar from 'StatusBar';
// CSS Modules
import Style from './Analyze.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Analyze: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <div className={Style.Main_Container}>
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
