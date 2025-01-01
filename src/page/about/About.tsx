//! # About Page
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/menu/Menu_Bar';
import Status_Bar from 'common/bar/status/Status_Bar';
// CSS Modules
import Style_App from 'common/App_Window.module.css';
import Style from './About.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const About: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Menu_Bar />
      <h1>About</h1>
      <div className={Style.Page}>
        <p>About page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default About;
//
/* ------------------------------------------------------------------------------------------------------------------ */
