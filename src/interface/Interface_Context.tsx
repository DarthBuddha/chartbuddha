//! # Interface Context
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import { useContext } from "react";
// Components
import { Interface_Context } from "./Interface_Context_Type";
//
/* ---------------------------------------------------------------------------------- */
//
export const useInterface_Context = () => {
  const context = useContext(Interface_Context);
  if (!context) {
    throw new Error("useSubscriptionContext must be used within a Context_Subscribe_Interface");
  }
  return context;
};
//
/* ---------------------------------------------------------------------------------- */
