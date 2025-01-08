// ---------------------------------------------------------------------------------------------- //
//! - Subscribe.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Hooks
import { usePageSubscribe } from 'page_subscribe/hooks/useSubscribeDataApi';
// Components
import Subscribe_Data from './Subscribe_Data';
import Subscribe_Api_List from './Subscribe_Api_List';
import Subscribe_Sub_List from './Subscribe_Sub_List';
// CSS Modules
import Style from './Subscribe.module.css';

/* ---------------------------------------------------------------------------------------------- */
//
const Subscribe: React.FC = () => {
  const { data_api, set_data_api } = usePageSubscribe();

  return (
    <div className={Style.Subscribe}>
      <div className={Style.Main_Container}>
        <div className={Style.Subscribe_Api_List}>
          <Subscribe_Api_List set_data_api={set_data_api} />
        </div>
        <div className={Style.Subscribe_Data}>
          <Subscribe_Data data_api={data_api} />
        </div>
        <div className={Style.Subscribe_Sub_List}>
          <Subscribe_Sub_List set_data_api={set_data_api} />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
//
/* ---------------------------------------------------------------------------------------------- */
