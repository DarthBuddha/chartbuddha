/* ---------------------------------------------------------------------------------------------- */
//! - ConnectApiList.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
// Interface
import { useInterfaceContext } from 'interface/InterfaceContext';
// CSS Modules
import Style from './ConnectApiList.module.css';

/* ---------------------------------------------------------------------------------------------- */

const ConnectApiList: React.FC = () => {
  // State Management
  const { setSelectedApi } = useInterfaceContext();

  // Handle Data Api Click
  const handleClick = async (selectedApi: string) => {
    const resetApi = ['binance', 'coinbase'];
    // Logic: Reset Context
    if (resetApi.includes(selectedApi)) {
      setSelectedApi(selectedApi);
    }
  };

  return (
    <div className={Style.List_Container}>
      <div className={Style.Title_Bar}>Apis</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleClick('binance')}>
          Binance
        </div>
        <div className={Style.Row} onClick={() => handleClick('coinbase')}>
          Coinbase
        </div>
      </div>
    </div>
  );
};

export default ConnectApiList;

/* ---------------------------------------------------------------------------------------------- */
