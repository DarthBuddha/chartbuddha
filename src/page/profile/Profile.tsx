/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Page: Page Profile - Profile
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Profile page for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: page/profile/Profile.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
// Components: MenuBar, StatusBar
import MenuBar from '../components/MenuBar.tsx'
import StatusBar from '../components/StatusBar.tsx'
// CSS Module
import Style from './css/Profile.module.css'

/* ---------------------------------------------------------------------------------------------- */
//
const Profile: React.FC = () => {
  return (
    <div className={Style.Page}>
      <div className={Style.Component_MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
      <div className={Style.Component_StatusBar}>
        <StatusBar />
      </div>
    </div>
    // <div className={Style.Profile}>
    //   <div className={Style.Main_Container}>
    //     <h1>Profile</h1>
    //     <p>User Profile page.</p>
    //   </div>
    // </div>
  )
}

export default Profile
//
/* ---------------------------------------------------------------------------------------------- */
