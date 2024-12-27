//! # App
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Components
import App from "./Index";
// Interfaces
import { Interface_Connect } from "./connect/interface/Interface_Connect";
import { Interface_Subscribe } from "./subscribe/interface/Interface_Subscribe";
// CSS Modules
import "./Global.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
createRoot(document.getElementById("root") as HTMLElement).render(
  <Interface_Subscribe>
    <Interface_Connect>
      <StrictMode>
        <App />
      </StrictMode>
    </Interface_Connect>
  </Interface_Subscribe>
);
//
/* ---------------------------------------------------------------------------------- */
