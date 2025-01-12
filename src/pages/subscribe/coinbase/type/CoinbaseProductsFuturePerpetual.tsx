/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseProductsFuturePerpetual.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseProductsFuturePerpetualType {
  open_interest: string;
  funding_rate: string;
  funding_time: string; // RFC3339 Timestamp
  max_leverage: string;
  base_asset_uuid: string;
  underlying_type: string;
}

const CoinbaseProductsFuturePerpetualContext =
  createContext<CoinbaseProductsFuturePerpetualType | null>(null);

export default CoinbaseProductsFuturePerpetualContext;

/* ---------------------------------------------------------------------------------------------- */
