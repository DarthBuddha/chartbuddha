/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Context: Context - InterfaceContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the application.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: context/InterfaceContext.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext, useContext } from 'react'
// Context
import { InterfaceType } from './Interface.tsx'

/* ---------------------------------------------------------------------------------------------- */

export const InterfaceContext = createContext<InterfaceType | null>(null)

/* ---------------------------------------------------------------------------------------------- */

export const useInterfaceContext = () => {
  const context = useContext(InterfaceContext)
  if (!context) {
    throw new Error('useInterfaceContext must be used within an InterfaceContext')
  }
  return context
}

/* ---------------------------------------------------------------------------------------------- */
