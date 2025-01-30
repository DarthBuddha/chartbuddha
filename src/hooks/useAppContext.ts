/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Hook: useAppContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the global state of the Interface.
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/useAppContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext, useContext } from 'react'
// Context
import { AppContextInterface } from '../interface/AppContext'

/* ---------------------------------------------------------------------------------------------- */

export const AppContext = createContext<AppContextInterface | null>(null)

/* ---------------------------------------------------------------------------------------------- */

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}

/* ---------------------------------------------------------------------------------------------- */
