/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Component: Index
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/Index.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// Context
import { AppContextProvider } from './AppContextProvider.tsx'
// Components
import Main from './Main.tsx'

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  </React.StrictMode>,
)

/* ---------------------------------------------------------------------------------------------- */
