/* ---------------------------------------------------------------------------------------------- */
//! - splash_window.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Components
import Splash from './Splash';
// Context
import { InterfaceProvider } from 'context/InterfaceProvider';

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InterfaceProvider>
      <Splash />
    </InterfaceProvider>
  </React.StrictMode>,
);

/* ---------------------------------------------------------------------------------------------- */
