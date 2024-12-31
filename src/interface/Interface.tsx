//! # Interface
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { ReactNode } from 'react';
// Components
import { InterfaceProvider } from '../../.temp/Interface_Provider';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Interface: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <InterfaceProvider>{children}</InterfaceProvider>;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
