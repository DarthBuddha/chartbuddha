/* ---------------------------------------------------------------------------------------------- */
//! - Profile.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// CSS Modules
import Style from './Profile.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const Profile: React.FC = () => {
  return (
    <div className={Style.Profile}>
      <div className={Style.Main_Container}>
        <h1>Profile</h1>
        <p>User Profile page.</p>
      </div>
    </div>
  );
};

export default Profile;
//
/* ---------------------------------------------------------------------------------------------- */
