/* ---------------------------------------------------------------------------------------------- */
//! - App
/* ---------------------------------------------------------------------------------------------- */

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Index
import ChartBuddha from './Index';
// Interface
import { InterfaceProvider } from 'interface/InterfaceProvider';

/* ---------------------------------------------------------------------------------------------- */

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <InterfaceProvider>
      <ChartBuddha />
    </InterfaceProvider>
  </StrictMode>,
);

/* ---------------------------------------------------------------------------------------------- */
