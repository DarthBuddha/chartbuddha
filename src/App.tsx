/* ---------------------------------------------------------------------------------------------- */
//! - App
/* ---------------------------------------------------------------------------------------------- */

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Index
import ChartBuddha from './pages/ChartBuddha';
// Interface
import { Provider_Interface } from 'interface/context/Provider_Interface';

/* ---------------------------------------------------------------------------------------------- */

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider_Interface>
      <ChartBuddha />
    </Provider_Interface>
  </StrictMode>,
);

/* ---------------------------------------------------------------------------------------------- */
