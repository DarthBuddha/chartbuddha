/* ---------------------------------------------------------------------------------------------- */
//! - Context Interface
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext, useContext } from 'react';
// Interface
import { Type_Interface } from './type/Type_Interface';

/* ---------------------------------------------------------------------------------------------- */

export const Context_Interface = createContext<Type_Interface | null>(null);

export const useContext_Interface = () => {
  const context = useContext(Context_Interface);
  if (!context) {
    throw new Error('useContext_Interface must be used within an Context_Interface');
  }
  return context;
};

/* ---------------------------------------------------------------------------------------------- */
