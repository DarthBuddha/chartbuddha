/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window -> StatusBar
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This component is responsible for rendering the application's status bar.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/window/components/StatusBar.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// CSS Module
import Style from '../Page.module.css'

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
