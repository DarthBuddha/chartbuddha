/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page News - News
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * News page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/news/News.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from './components/MenuBar.tsx'
import StatusBar from './components/StatusBar.tsx'
// CSS Module
import Style from '../css/News.module.css'

/* ---------------------------------------------------------------------------------------------- */

const News: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}><MenuBar /></div>
      <div className={Style.Frame}>
        <h1>Welcome to ChartBuddha</h1>
      </div>
      <div className={Style.Component_StatusBar}><StatusBar /></div>
    </div>
  )
}

export default News

/* ---------------------------------------------------------------------------------------------- */
