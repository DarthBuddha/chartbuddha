//! # Interface Window
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore, Store } from '@tauri-apps/plugin-store';
// import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
// Interface
import { Interface_PageContext } from './Interface_PageContext';
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
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  if (selectedPage) {
    info(selectedPage);
  }

  useEffect(() => {
    if (store_interface && selectedPage !== null) {
      store_interface.set('target', { selectedPage: selectedPage }).then(() => {
        store_interface?.save();
      });
    }
  }, [selectedPage]);

  return (
    <Interface_PageContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
      }}
    >
      {children}
    </Interface_PageContext.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
