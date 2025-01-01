//! # Profile
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Common
import Menu_Bar from 'common/bar/menu/Menu_Bar';
import Status_Bar from 'common/bar/status/Status_Bar';
// CSS Modules
import Style_App from 'common/App_Window.module.css';
import Style from './Profile.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Profile: React.FC = () => {
  return (
    <div className={Style_App.App_Window}>
      <Menu_Bar />
      <div className={Style.Page}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
      <Status_Bar />
    </div>
  );
};

export default Profile;
//
/* ------------------------------------------------------------------------------------------------------------------ */
