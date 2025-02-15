/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Page Connect -> Connect
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * The Connect page is responsible for Api and Database connection settings.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/connect/Connect.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from 'components/MenuBar.tsx'
import Connect_ApiList from './Connect_ApiList.tsx'
import Connect_Tab from './Connect_Tab.tsx'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>

      <div className={Style.Frame_Container}>
        <div className={Style.Frame_ApiList}>
          <Connect_ApiList />
        </div>
        <div className={Style.Frame_ConnectTab}>
          <Connect_Tab />
        </div>
      </div>

      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Connect

/* ---------------------------------------------------------------------------------------------- */
