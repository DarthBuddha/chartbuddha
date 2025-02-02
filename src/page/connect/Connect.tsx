/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect - Connect
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * The Connect page is responsible for Api and Database connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/connect/Connect.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from '../components/MenuBar.tsx'
import StatusBar from '../components/StatusBar.tsx'
import ConnectApiList from './ConnectListApi.tsx'
import ConnectTab from './ConnectTab.tsx'
// CSS Module
import Style from './css/Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}>
        <MenuBar />
      </div>

      <div className={Style.Frame}>
        <div className={Style.ConnectApiListContainer}>
          <ConnectApiList />
        </div>
        <div className={Style.ConnectTabContainer}>
          <ConnectTab />
        </div>
      </div>

      <div className={Style.Component_StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Connect

/* ---------------------------------------------------------------------------------------------- */
