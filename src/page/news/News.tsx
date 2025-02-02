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
import MenuBar from 'components/MenuBar.tsx'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/News.module.css'

/* ---------------------------------------------------------------------------------------------- */

const News: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame}>
        <h1>News</h1>
      </div>
      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default News

/* ---------------------------------------------------------------------------------------------- */
