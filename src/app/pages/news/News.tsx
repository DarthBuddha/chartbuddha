/* ---------------------------------------------------------------------------------------------- */
//! # Page: App Pages News - News
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * News page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/news/News.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// CSS Module
import Style from './News.module.css'

/* ---------------------------------------------------------------------------------------------- */

const News: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
      </div>
    </div>
  )
}

export default News

/* ---------------------------------------------------------------------------------------------- */
