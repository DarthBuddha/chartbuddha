/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Analyze - Analyze
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Analyze page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/analyze/Analyze.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from 'components/MenuBar.tsx'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/Analyze.module.css'

/* ---------------------------------------------------------------------------------------------- */
//
const Analyze: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame_Container}>
        <h1>Analyze</h1>
        <p>Analyze page.</p>
      </div>
      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Analyze
//
/* ---------------------------------------------------------------------------------------------- */
