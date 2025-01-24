/* ---------------------------------------------------------------------------------------------- */
//! # Window: main_window
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Main window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: main_window.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// Context
import { InterfaceProvider } from 'app/context/InterfaceProvider.tsx'
// Components
import Main from './app/Main.tsx'

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InterfaceProvider>
      <Main />
    </InterfaceProvider>
  </React.StrictMode>,
)

/* ---------------------------------------------------------------------------------------------- */
