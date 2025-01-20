/* ---------------------------------------------------------------------------------------------- */
//! - main_window.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Component
import Main from './Main';
// Context
import { InterfaceProvider } from 'context/InterfaceProvider';

/* ---------------------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InterfaceProvider>
      <Main />
    </InterfaceProvider>
  </React.StrictMode>,
);

/* ---------------------------------------------------------------------------------------------- */
