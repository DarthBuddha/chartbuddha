/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page ->Splash
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash page for the application
/* ---------------------------------------------------------------------------------------------- */
//! #####
//! * src/page/splash/Splash.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Hooks
import { useAppContext } from '../hooks/useAppContext'
import { useSetupReact } from '../hooks/useSetupReact'
// CSS Module
import Style from '../css/Splash.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Splash: React.FC = () => {
  // Context: Interface
  const { setPage } = useAppContext()
  useSetupReact() // Call the hook here
  setPage('Home')


  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}></div>
      <div className={Style.Frame}><h1>Splash</h1></div>
      <div className={Style.Component_StatusBar}></div>
    </div>
  )
}

export default Splash

/* ---------------------------------------------------------------------------------------------- */
