//! Context - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Interface
import { Type_Broker } from './broker/Type_Broker';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Context_Broker = createContext<Type_Broker | null>(null);

export const useContext_Broker = () => {
  const context = useContext(Context_Broker);
  if (!context) {
    throw new Error('useInterface_BrokerContext must be used within an Interface_Broker');
  }
  return context;
};
//
/* ------------------------------------------------------------------------------------------------------------------ */
