//! # Interface Page Context
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Type_Window } from './Type_Window';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Context_Window = createContext<Type_Window | null>(null);

export const useContext_Window = () => {
  const context = useContext(Context_Window);
  if (!context) {
    throw new Error('useInterface_PageContext must be used within an Interface_Page');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
