//! # Interface Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Components
import { Interface_Context_Type } from './Interface_Context_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_Context = createContext<Interface_Context_Type | null>(null);

export const useInterfaceContext = () => {
  const context = useContext(Interface_Context);
  if (!context) {
    throw new Error('useInterfaceContext must be used within an InterfaceProvider');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
