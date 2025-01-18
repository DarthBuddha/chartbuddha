/* ------------------------------------------------------------------------------------------------------------------ */
//! - interface.Coinbase.tsx
/* ------------------------------------------------------------------------------------------------------------------ */

// React
import { createContext } from 'react';
// Components
import { ApiType } from './api/Api';
import { ProductsType } from './products/Products';

/* ------------------------------------------------------------------------------------------------------------------ */

export interface CoinbaseType {
  coinbase_api: ApiType;
  coinbase_products: ProductsType[];
}

const CoinbaseContext = createContext<CoinbaseType | null>(null);

export default CoinbaseContext;

/* ------------------------------------------------------------------------------------------------------------------ */
