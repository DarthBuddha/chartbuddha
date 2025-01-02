//! Provider - Window
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState, useEffect } from 'react';
// Tauri
import { getStore } from '@tauri-apps/plugin-store';
// import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
// Interface
import { Context_Window } from './Context_Window';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const store = await getStore('.window.json');
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Provider_Window: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selected Page
  const [selected_Page, setSelected_Page] = useState<string | null>(null);
  if (selected_Page) {
    info(selected_Page);
  }

  useEffect(() => {
    if (store && selected_Page !== null) {
      store.get('window').then((target) => {
        const updatedTarget = { ...(typeof target === 'object' && target !== null ? target : {}), selected_Page };
        store?.set('window', updatedTarget).then(() => {
          store?.save();
        });
      });
    }
  }, [selected_Page]);

  return (
    <Context_Window.Provider
      value={{
        selected_Page,
        setSelected_Page,
      }}
    >
      {children}
    </Context_Window.Provider>
  );
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
