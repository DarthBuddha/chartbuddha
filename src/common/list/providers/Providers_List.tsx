//! # Providers List
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
import { info } from '@tauri-apps/plugin-log';
// Interface
import { useInterface_ProviderContext } from 'interface/Interface_ProviderContext';
// CSS Modules
import Style from './Providers_List.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
let store_interface: Store | null = null;
getStore('.interface.json').then((store) => {
  store_interface = store;
});
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Providers_List: React.FC = () => {
  const { setSelectedProvider } = useInterface_ProviderContext();
  // Removed incorrect usage of provider
  const handleProviderClick = async (provider: string) => {
    setSelectedProvider(provider);
    if (store_interface) {
      await store_interface.set('selectedProvider', { value: provider });
    }
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

export default Providers_List;
//
/* ------------------------------------------------------------------------------------------------------------------ */
