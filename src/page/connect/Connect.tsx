/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Connect - Connect
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * The Connect page is responsible for Api and Database connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/Connect.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import ConnectTab from './ConnectTab.tsx'
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
          <ConnectTab />
        </div>
      </div>
    </div>
  )
}

export default Connect

/* ---------------------------------------------------------------------------------------------- */
