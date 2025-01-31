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
// import useEffect from 'react'
// import { useSetupReact } from './hooks/useSetupReact'
// import { SetupReact } from './common/SetupReact'
import Style from './Splash.module.css'
// Interface
// import { useAppContext } from '../../hooks/useAppContext'

/* ---------------------------------------------------------------------------------------------- */


const Splash: React.FC = () => {
  return (
    <div className={Style.Splash}>
      <div className={Style.Main_Container}>
        <h1>Welcome to ChartBuddha</h1>
        {/* <button onClick={stopAllStreams}>Stop All Streams</button> */}
      </div>
    </div>
  )
}

export default Splash
/* ---------------------------------------------------------------------------------------------- */
