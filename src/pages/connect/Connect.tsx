// ---------------------------------------------------------------------------------------------- //
//! - Connect.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Components
import ConnectData from './ConnectData';
import ConnectApiList from './ConnectApiList';
// CSS Modules
import Style from './Connect.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  return (
    <div className={Style.Connect}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <ConnectApiList />
        </div>
        <div className={Style.Provider_Container}>
          <ConnectData />
        </div>
      </div>
    </div>
  );
};

export default Connect;

/* ---------------------------------------------------------------------------------------------- */
