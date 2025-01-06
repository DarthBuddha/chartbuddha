// ---------------------------------------------------------------------------------------------- //
//! - Connect.tsx
// ---------------------------------------------------------------------------------------------- //

// React
import React from 'react';
// Hooks
import { usePageConnect } from 'interface/hooks/usePageConnect';
// Components
import Connect_Data from './Connect_Data';
import Connect_ApiList from './Connect_ApiList';
// CSS Modules
import Style from './Connect.module.css';

/* ---------------------------------------------------------------------------------------------- */

const Connect: React.FC = () => {
  const { dataApi, setDataApi } = usePageConnect();

  return (
    <div className={Style.Connect}>
      <div className={Style.Main_Container}>
        <div className={Style.List_Container}>
          <Connect_ApiList setDataApi={setDataApi} />
        </div>
        <div className={Style.Provider_Container}>
          <Connect_Data dataApi={dataApi} />
        </div>
      </div>
    </div>
  );
};

export default Connect;

/* ---------------------------------------------------------------------------------------------- */
