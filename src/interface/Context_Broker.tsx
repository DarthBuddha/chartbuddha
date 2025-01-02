//! Context - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext, useContext } from 'react';
// Tauri
import { error } from '@tauri-apps/plugin-log';
// Interface
import { Type_Broker } from './Type_Broker';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export const Context_Broker = createContext<Type_Broker | null>(null);
export const Context_Broker_Update = createContext<Type_Broker | null>(null);

export function useContext_Broker(): Type_Broker {
  const context = useContext(Context_Broker);
  if (!context) {
    throw error('useContext_Broker must be used within the Provider_Broker');
  }
  return context;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export function useContext_Broker_Update() {
  return useContext(Context_Broker_Update);
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
