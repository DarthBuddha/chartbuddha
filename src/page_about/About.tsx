//! # About Page
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/MenuBar';
import Status_Bar from 'common/StatusBar';
// CSS Modules
import Style from './About.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const About: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <h1>About</h1>
      <div className={Style.Main_Container}>
        <p>About page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default About;
//
/* ------------------------------------------------------------------------------------------------------------------ */
