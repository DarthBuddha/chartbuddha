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
import Style from './StatusBar.module.css'

/* ---------------------------------------------------------------------------------------------- */

const StatusBar: React.FC = () => {
  return (
    <div className={Style.StatusBar}>
      <div className={Style.Container_Left}></div>
      <div className={Style.Container_Center}></div>
      <div className={Style.Container_Right}></div>
    </div>
  )
}

export default StatusBar

/* ---------------------------------------------------------------------------------------------- */
