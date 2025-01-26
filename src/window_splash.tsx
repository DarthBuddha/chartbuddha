/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Window: splash_window
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * Splash window for the application
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: splash_window.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// Context
import { InterfaceProvider } from './context/InterfaceProvider.tsx'
// Components
import Splash from './window/Splash.tsx'

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InterfaceProvider>
      <Splash />
    </InterfaceProvider>
  </React.StrictMode>,
)

/* ---------------------------------------------------------------------------------------------- */
