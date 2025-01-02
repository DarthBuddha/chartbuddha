//! # App
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Index
import Index from './page/Index';
// Interface
import { Provider_Broker } from 'interface/Provider_Broker';
import { Provider_Window } from 'interface/Provider_Window';
// CSS Module
import Style from './App.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider_Window>
      <Provider_Broker>
        <div className={Style.App}>
          <Index />
        </div>
      </Provider_Broker>
    </Provider_Window>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
