//! ---------------------------------------------------------------------------------------------------------------- !//
//! - App
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Index
import Index from './page/Index';
// Interface
import { Provider_Interface } from 'interface/Provider_Interface';
// CSS Module
import Style from './App.module.css';

/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider_Interface>
      <div className={Style.App}>
        <Index />
      </div>
    </Provider_Interface>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
