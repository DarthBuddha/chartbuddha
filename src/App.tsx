//! # App
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Components
import Index from "./page/Index";
import { Interface } from "./interface/Interface";
// CSS Module
import Style from "./App.module.css";
// import "./Global.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
createRoot(document.getElementById("root") as HTMLElement).render(

  <StrictMode>
    <Interface>
      <div className={Style.App}>
        <Index />
      </div>
    </Interface>
  </StrictMode>
);
//
/* ---------------------------------------------------------------------------------- */
