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
// Components:
import MenuBar from 'components/MenuBar.tsx'
import StatusBar from 'components/StatusBar.tsx'
// CSS Module
import Style_App from 'css/App.module.css'
import Style from './css/Profile.module.css'

/* ---------------------------------------------------------------------------------------------- */
//
const Profile: React.FC = () => {
  return (
    <div className={Style_App.Page}>
      <div className={Style_App.MenuBar}>
        <MenuBar />
      </div>
      <div className={Style.Frame}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
      <div className={Style_App.StatusBar}>
        <StatusBar />
      </div>
    </div>
  )
}

export default Profile
//
/* ---------------------------------------------------------------------------------------------- */
