// ---------------------------------------------------------------------------------------------- //
//! - Connect.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Hooks
import { usePageConnect } from 'page_connect/hooks/useConnectDataApi';
// Components
import Connect_Data from './Connect_Data';
import Connect_Api_List from './Connect_Api_List';
// CSS Modules
import Style from './Connect.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  const { data_api, set_data_api } = usePageConnect();

  return (
    <div className={Style.Connect}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <Connect_Api_List set_data_api={set_data_api} />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Data data_api={data_api} />
        </div>
      </div>
    </div>
  );
};

export default Connect;

/* ---------------------------------------------------------------------------------------------- */
