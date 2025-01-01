//! # Interface Windows Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Page_Type } from 'interface/type/Page_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface_PageContext = createContext<Page_Type | null>(null);

export const useInterface_PageContext = () => {
  const context = useContext(Interface_PageContext);
  if (!context) {
    throw new Error('useInterface_PageContext must be used within an Interface_Page');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
