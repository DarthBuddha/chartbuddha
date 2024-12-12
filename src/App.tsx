//! # ChartBuddha
//! Page: App
//! Description: Main entry point for the frontend.
//! ##### App.tsx
//
// Dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Modules
import App from "./Index";
import { Context_Connect_Interface } from "./pages/connect/interface/Context_Connect_Interface";
//
/*--------------------------------------< Page >--------------------------------------*/
createRoot(document.getElementById("root") as HTMLElement).render(
  <Context_Connect_Interface>
    <StrictMode>
      <App />
    </StrictMode>
  </Context_Connect_Interface>
);
