/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window Components - StatusBar
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the application's status bar.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: window/components/StatusBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// CSS Module
import Style from './Page.module.css'

/* ---------------------------------------------------------------------------------------------- */

const StatusBar: React.FC = () => {
  return (
    <div className={Style.StatusBarComponent}>
      <div className={Style.BarContainerLeft}></div>
      <div className={Style.BarContainerCenter}></div>
      <div className={Style.BarContainerRight}></div>
    </div>
  )
}

export default StatusBar

/* ---------------------------------------------------------------------------------------------- */
