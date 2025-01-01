//! # Interface Page Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Type_Page } from './page/Page_Type';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Context_Page = createContext<Type_Page | null>(null);

export const useContext_Page = () => {
  const context = useContext(Context_Page);
  if (!context) {
    throw new Error('useInterface_PageContext must be used within an Interface_Page');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
