//! # Interface Provider Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Provider_Type } from 'interface/type/Provider_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_ProviderContext = createContext<Provider_Type | null>(null);

export const useInterface_ProviderContext = () => {
  const context = useContext(Interface_ProviderContext);
  if (!context) {
    throw new Error('useInterface_ProviderContext must be used within an Interface_Provider');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
