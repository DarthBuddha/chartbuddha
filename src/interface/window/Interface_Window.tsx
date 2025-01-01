//! # Interface Window
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useState } from 'react';
// Tauri
// import { getStore } from '@tauri-apps/plugin-store';
// import { invoke } from '@tauri-apps/api/core';
// import { error } from '@tauri-apps/plugin-log';
// Interface
import { Interface_WindowContext } from './Interface_WindowContext';
// import { Window_Type } from '../type/Window_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_Window: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  // const handleError = (err: unknown) => {
  //   if (err instanceof Error) {
  //     error(err.message);
  //   } else {
  //     error(`An unknown error occurred: ${JSON.stringify(err)}`);
  //   }
  // };

  return (
    <Interface_WindowContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
      }}
    >
      {children}
    </Interface_WindowContext.Provider>
  );
};
