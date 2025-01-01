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
import { Interface } from 'interface/Interface';
// CSS Module
import Style from './App.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Interface>
      <div className={Style.App}>
        <Index />
      </div>
    </Interface>
  </StrictMode>,
);
//
/* ------------------------------------------------------------------------------------------------------------------ */
