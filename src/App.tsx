//! ---------------------------------------------------------------------------------------------------------------- !//
//! - App
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Index
import ChartBuddha from './ChartBuddha';
// Interface
import { Provider_Interface } from 'interface/Provider_Interface';

/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider_Interface>
      <ChartBuddha />
    </Provider_Interface>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
