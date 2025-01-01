//! # Interface Windows Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Window_Type } from 'interface/type/Window_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_WindowContext = createContext<Window_Type | null>(null);

export const useInterface_WindowContext = () => {
  const context = useContext(Interface_WindowContext);
  if (!context) {
    throw new Error('useInterface_WindowContext must be used within an Interface_Window');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
