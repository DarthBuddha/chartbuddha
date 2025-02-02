/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Subscribe - Subscribe
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/subscribe/Subscribe.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import MenuBar from '../components/MenuBar.tsx'
import StatusBar from '../components/StatusBar.tsx'
import SubscribeApiList from './SubscribeApiList'
import SubscribeData from './SubscribeData'
import SubscribeSubList from './SubscribeSubList'
// CSS Module
import Style from './css/Subscribe.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Main_Container}>
        <div className={Style.Subscribe_Api_List}>
          <SubscribeApiList />
        </div>
        <div className={Style.Subscribe_Data}>
          <SubscribeData />
        </div>
        <div className={Style.Subscribe_Sub_List}>
          <SubscribeSubList />
        </div>
      </div>
      <div className={Style.Component_StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Subscribe

/* ---------------------------------------------------------------------------------------------- */
