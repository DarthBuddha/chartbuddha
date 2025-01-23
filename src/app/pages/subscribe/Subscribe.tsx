/* ---------------------------------------------------------------------------------------------- */
//! # Page: App Pages Subscribe - Subscribe
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Subscribe page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/pages/subscribe/Subscribe.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components
import SubscribeApiList from './SubscribeApiList'
import SubscribeData from './SubscribeData'
import SubscribeSubList from './SubscribeSubList'
// CSS Module
import Style from './Subscribe.module.css'

/* ---------------------------------------------------------------------------------------------- */

const Subscribe: React.FC = () => {
  return (
    <div className={Style.Subscribe}>
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
    </div>
  )
}

export default Subscribe

/* ---------------------------------------------------------------------------------------------- */
