/* ---------------------------------------------------------------------------------------------- */
//! # Page: App Pages Connect - Connect
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Connect page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/connect/Connect.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import ConnectData from './ConnectData.tsx'
import ConnectApiList from './ConnectApiList.tsx'
// CSS Module
import Style from './Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  return (
    <div className={Style.Connect}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <ConnectApiList />
        </div>
        <div className={Style.Provider_Container}>
          <ConnectData />
        </div>
      </div>
    </div>
  )
}

export default Connect

/* ---------------------------------------------------------------------------------------------- */
