//! ---------------------------------------------------------------------------------------------------------------- !//
//! - Type Interface
//! ---------------------------------------------------------------------------------------------------------------- !//
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Interface
import { Type_ProductData } from './Type_ProductData';
import { Type_ApiPermissions } from './Type_ApiPermissions';

/* ------------------------------------------------------------------------------------------------------------------ */
//
export interface Type_Interface {
  // Page
  selected_Page: string | null;
  setFocus_Page: React.Dispatch<React.SetStateAction<string | null>>;

  // Connect Page
  selected_Api: string | null;
  setFocus_Api: React.Dispatch<React.SetStateAction<string | null>>;
  selected_ApiPermissions: Type_ApiPermissions | null;
  setFocus_ApiPermissions: React.Dispatch<React.SetStateAction<Type_ApiPermissions | null>>;

  // Subscribe Page
  selected_Broker: string | null;
  setFocus_Broker: React.Dispatch<React.SetStateAction<string | null>>;
  selected_ProductType: string | null;
  setFocus_ProductType: React.Dispatch<React.SetStateAction<string | null>>;
  selected_ProductName: string | null;
  setFocus_ProductName: React.Dispatch<React.SetStateAction<string | null>>;
  selected_ProductData: Type_ProductData | null;
  setFocus_ProductData: React.Dispatch<React.SetStateAction<Type_ProductData | null>>;

  // fetch_BrokerProductData: () => void;
  // subscribe_BrokerProductData: (product: Type_BrokerProductData | null) => Promise<void>;
  // unsubscribe_BrokerProductData: (product: Type_BrokerProductData | null) => Promise<void>;
}
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const Context_Broker = createContext<Type_Interface | null>(null);

export default Context_Broker;
//
/* ------------------------------------------------------------------------------------------------------------------ */
