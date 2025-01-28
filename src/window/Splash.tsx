/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Window - Splash
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: window/Splash.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import { useSetupReact } from '../hooks/useSetupReact'
import Style from './Page.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Splash: React.FC = () => {
  useSetupReact()

  return (
    <div className={Style.SplashComponent}>
      <div className={Style.MenuBarContainer}>{/* <MenuBar /> */}</div>
      <div className={Style.PageContainer}>
        <div className={Style.SplashText}>
          <h1>Welcome to ChartBuddha</h1>
          <p>Setting up the application...</p>
        </div>
      </div>
      <div className={Style.StatusBarContainer}>{/* <StatusBar /> */}</div>
    </div>
  )
}

export default Splash

/* ---------------------------------------------------------------------------------------------- */
