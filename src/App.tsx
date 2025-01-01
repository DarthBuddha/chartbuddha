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
import { Interface_Provider } from 'interface/Interface_Provider';
import { Interface_Page } from 'interface/Interface_Page';
// CSS Module
import Style from './App.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Interface_Page>
      <Interface_Provider>
        <div className={Style.App}>
          <Index />
        </div>
      </Interface_Provider>
    </Interface_Page>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
