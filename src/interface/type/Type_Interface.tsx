//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Type Interface
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Interface
import { Type_BrokerProductData } from './Type_BrokerProductData';

/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Type_Interface {
  // Broker
  selected_Broker: string | null;
  setFocus_Broker: React.Dispatch<React.SetStateAction<string | null>>;
  // Broker Product
  selected_BrokerProduct: string | null;
  setFocus_BrokerProduct: React.Dispatch<React.SetStateAction<string | null>>;
  // Broker Product Data
  selected_BrokerProductData: Type_BrokerProductData | null;
  setFocus_BrokerProductData: React.Dispatch<React.SetStateAction<Type_BrokerProductData | null>>;
  // fetch_BrokerProductData: () => void;
  // subscribe_BrokerProductData: (product: Type_BrokerProductData | null) => Promise<void>;
  // unsubscribe_BrokerProductData: (product: Type_BrokerProductData | null) => Promise<void>;

  // Page
  selected_Page: string | null;
  setFocus_Page: React.Dispatch<React.SetStateAction<string | null>>;
  // Product Type
  selected_PageProductType: string | null;
  setFocus_PageProductType: React.Dispatch<React.SetStateAction<string | null>>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Context_Broker = createContext<Type_Interface | null>(null);

export default Context_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
