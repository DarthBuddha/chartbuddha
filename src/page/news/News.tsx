//! # News
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
import Style from './News.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const News: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Menu_Bar />
      <div className={Style.Page}>
        <h1>News</h1>
        <p>News page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default News;
//
/* ------------------------------------------------------------------------------------------------------------------ */
