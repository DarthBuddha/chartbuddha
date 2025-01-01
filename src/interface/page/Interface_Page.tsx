//! Interface - Page
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
// import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
// Interface
import { Context_Page } from '../Context_Page';
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
export const Interface_Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selected Page
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  if (selectedPage) {
    info(selectedPage);
  }

  useEffect(() => {
    if (store_interface && selectedPage !== null) {
      store_interface.get('target').then((target) => {
        const updatedTarget = { ...(typeof target === 'object' && target !== null ? target : {}), selectedPage };
        store_interface?.set('target', updatedTarget).then(() => {
          store_interface?.save();
        });
      });
    }
  }, [selectedPage]);

  return (
    <Context_Page.Provider
      value={{
        selectedPage,
        setSelectedPage,
      }}
    >
      {children}
    </Context_Page.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
