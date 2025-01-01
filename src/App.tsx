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
// import { Interface } from 'interface/Interface';
import { Interface_Broker } from 'interface/broker/Interface_Broker';
import { Interface_Page } from 'interface/page/Interface_Page';
// CSS Module
import Style from './App.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Interface_Page>
      <Interface_Broker>
        <div className={Style.App}>
          <Index />
        </div>
      </Interface_Broker>
    </Interface_Page>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
