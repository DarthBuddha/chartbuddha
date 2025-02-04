/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Subscribe -> Subscribe
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * page/subscribe/Subscribe.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from 'components/MenuBar.tsx'
import Subscribe_ApiList from './Subscribe_ApiList'
import Subscribe_Tab from './Subscribe_Tab'
import Subscribe_SubList from './Subscribe_SubList'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/Subscribe.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame_Container}>
        <div className={Style.Frame_ApiList}>
          <Subscribe_ApiList />
        </div>
        <div className={Style.Frame_Tab}>
          <Subscribe_Tab />
        </div>
        <div className={Style.Frame_SubList}>
          <Subscribe_SubList />
        </div>
      </div>
      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Subscribe

/* ---------------------------------------------------------------------------------------------- */
