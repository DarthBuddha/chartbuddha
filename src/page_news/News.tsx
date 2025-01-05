//! # News
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/MenuBar';
import Status_Bar from 'common/StatusBar';
// CSS Modules
import Style from './News.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const News: React.FC = () => {
  return (
    <div className={Style.Page}>
      <Menu_Bar />
      <div className={Style.Main_Container}>
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
