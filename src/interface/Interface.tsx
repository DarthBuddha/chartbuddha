//! # Interface
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { ReactNode } from 'react';
// Interface
import { Interface_Provider } from 'interface/Interface_Provider';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Interface_Provider>{children}</Interface_Provider>;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
