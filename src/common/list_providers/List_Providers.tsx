//! # List Providers
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Tauri
import { load } from '@tauri-apps/plugin-store';
import { info } from '@tauri-apps/plugin-log';
// Components
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Modules
import Style from './List_Providers.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store_interface = await load('.interface.json', { autoSave: false });

const List_Providers: React.FC = () => {
  const { setSelectedProvider } = useInterfaceContext();

  const handleProviderClick = async (provider: string) => {
    setSelectedProvider(provider);
    await store_interface.set('selectedProvider', { value: provider });
    info(provider);
  };

  return (
    <div className={Style.List_Providers}>
      <div className={Style.Title}>Providers</div>
      <div className={Style.List}>
        <div className={Style.Row} onClick={() => handleProviderClick('coinbase')}>
          Coinbase
        </div>
        <div className={Style.Row} onClick={() => handleProviderClick('binance')}>
          Binance
        </div>
        {/* <p>Selected: {selectedProvider}</p> */}
      </div>
    </div>
  );
};

export default List_Providers;
//
/* ------------------------------------------------------------------------------------------------------------------ */
