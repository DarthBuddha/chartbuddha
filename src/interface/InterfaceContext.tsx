/* ---------------------------------------------------------------------------------------------- */
//! - InterfaceContext.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext, useContext } from 'react';
// Interface
import { InterfaceType } from './InterfaceType';

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceContext = createContext<InterfaceType | null>(null);

/* ---------------------------------------------------------------------------------------------- */

export const useInterfaceContext = () => {
  const context = useContext(InterfaceContext);
  if (!context) {
    throw new Error('useInterfaceContext must be used within an InterfaceContext');
  }
  return context;
};

/* ---------------------------------------------------------------------------------------------- */
