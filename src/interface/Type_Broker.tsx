//! Type - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext } from 'react';
// Interface
import { Type_BrokerProductData } from './Type_BrokerProductData';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Type_Broker {
  // Broker
  selected_Broker: string | null;
  setSelected_Broker: React.Dispatch<React.SetStateAction<string | null>>;
  // Broker Product
  selected_BrokerProduct: string | null;
  setSelected_BrokerProduct: React.Dispatch<React.SetStateAction<string | null>>;
  // Broker Product Type
  selected_BrokerProductType: string | null;
  setSelected_BrokerProductType: React.Dispatch<React.SetStateAction<string | null>>;
  // Broker Product Data
  selected_BrokerProductData: Type_BrokerProductData | null;
  setSelected_BrokerProductData: React.Dispatch<React.SetStateAction<Type_BrokerProductData | null>>;
  fetch_BrokerProductData: () => void;
  // subscribeToProduct: (product: Type_BrokerProduct | null) => Promise<void>;
  // unsubscribeFromProduct: (product: Type_BrokerProduct | null) => Promise<void>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Context_Broker = createContext<Type_Broker | null>(null);

export default Context_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
