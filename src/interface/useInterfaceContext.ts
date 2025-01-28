/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: useInterfaceContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/useInterfaceContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext, useContext } from 'react'
// Context
import { ContextInterface } from './contextInterface'

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceContext = createContext<ContextInterface | null>(null)

/* ---------------------------------------------------------------------------------------------- */

export const useInterfaceContext = () => {
  const context = useContext(InterfaceContext)
  if (!context) {
    throw new Error('useInterfaceContext must be used within an InterfaceContext')
  }
  return context
}

/* ---------------------------------------------------------------------------------------------- */
