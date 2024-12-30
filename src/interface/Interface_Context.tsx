//! # Interface Context
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { useContext } from "react";
// Components
import { Interface_Context } from "./Interface_Context_Type";
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const useInterfaceContext = () => {
  const context = useContext(Interface_Context);
  if (!context) {
    throw new Error("use_Interface_Context must be used within a Interface_Context_Type");
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
