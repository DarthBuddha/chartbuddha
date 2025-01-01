//! Type - Broker
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import { createContext } from 'react';
// Interface
import { Type_BrokerProduct } from './Type_BrokerProduct';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Type_Broker {
  selectedBroker: string | null;
  setSelectedBroker: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: Type_BrokerProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Type_BrokerProduct | null>>;
  productData: Type_BrokerProduct | null;
  fetchProductData: () => void;
  subscribeToProduct: (product: Type_BrokerProduct | null) => Promise<void>;
  unsubscribeFromProduct: (product: Type_BrokerProduct | null) => Promise<void>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Context_Broker = createContext<Type_Broker | null>(null);

export default Context_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
