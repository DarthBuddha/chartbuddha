/* ---------------------------------------------------------------------------------------------- */
//! # Module: splash_window
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: splash_window.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// Components
import Splash from './app/Splash'
// Context
import { InterfaceProvider } from 'app/context/InterfaceProvider'

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InterfaceProvider>
      <Splash />
    </InterfaceProvider>
  </React.StrictMode>,
)

/* ---------------------------------------------------------------------------------------------- */
