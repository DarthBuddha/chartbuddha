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
import ConnectApiList from './ConnectApiList.tsx'
import ConnectTab from './ConnectTab.tsx'
// CSS Module
import Style from './Connect.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  return (
    <div className={Style.ConnectComponent}>
      <div className={Style.PageContainer}>
        <div className={Style.ConnectApiListContainer}>
          <ConnectApiList />
        </div>
        <div className={Style.ConnectTabContainer}>
          <ConnectTab />
        </div>
      </div>
    </div>
  )
}

export default Connect

/* ---------------------------------------------------------------------------------------------- */
