/* ---------------------------------------------------------------------------------------------- */
//! - InterfaceType.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */
// Global State Management
export interface InterfaceType {
  // Context: Page
  selectedPage: string | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<string | null>>;

  // Context: Api
  selectedApi: string | null;
  setSelectedApi: React.Dispatch<React.SetStateAction<string | null>>;

  selectedProductType: string | null;
  setSelectedProductType: React.Dispatch<React.SetStateAction<string | null>>;

  // selectedProductList: string | null;
  // setSelectedProductList: React.Dispatch<React.SetStateAction<string | null>>;

  // selected_ProductName: string | null;
  // setFocus_ProductName: React.Dispatch<React.SetStateAction<string | null>>;
}

const InterfaceContext = createContext<InterfaceType | null>(null);

export default InterfaceContext;

/* ---------------------------------------------------------------------------------------------- */
