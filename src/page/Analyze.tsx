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
import MenuBar from './components/MenuBar.tsx'
import StatusBar from './components/StatusBar.tsx'
// CSS Module
import Style from '../css/Analyze.module.css'

/* ---------------------------------------------------------------------------------------------- */
//
const Analyze: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}><MenuBar /></div>
      <div className={Style.Frame}>
        <h1>Analyze</h1>
        <p>Analyze page.</p>
      </div>
      <div className={Style.Component_StatusBar}><StatusBar /></div>
    </div>
  )
}

export default Analyze
//
/* ---------------------------------------------------------------------------------------------- */
