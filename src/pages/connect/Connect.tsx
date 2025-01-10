// ---------------------------------------------------------------------------------------------- //
//! - Connect.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Hooks
import { usePageConnect } from 'hooks/useConnectApiData';
// Components
import Connect_Data from '../../page_connect/Connect_Data';
import Connect_Api_List from './Connect_Api_List';
// CSS Modules
import Style from './Connect.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  const { api_data, set_api_data } = usePageConnect();

  return (
    <div className={Style.Connect}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <Connect_Api_List set_api_data={set_api_data} />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Data api_data={api_data} />
        </div>
      </div>
    </div>
  );
};

export default Connect;

/* ---------------------------------------------------------------------------------------------- */
