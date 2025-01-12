/* ---------------------------------------------------------------------------------------------- */
//! - CoinbaseProductsFuture.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react';
// Interface
import { CoinbaseProductsFuturePerpetualType } from './CoinbaseProductsFuturePerpetual';

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseProductsFutureType {
  venue: string;
  contract_code: string;
  contract_expiry: string; // RFC3339 Timestamp
  contract_size: string;
  contract_root_unit: string;
  group_description: string;
  contract_expiry_timezone: string;
  group_short_description: string;
  risk_managed_by: string;
  contract_expiry_type: string;
  perpetual_details: CoinbaseProductsFuturePerpetualType; // object
  contract_display_name: string;
  time_to_expiry_ms: number;
  non_crypto: boolean;
  contract_expiry_name: string;
  twenty_four_by_seven: boolean;
}

const CoinbaseProductsFuturesContext = createContext<CoinbaseProductsFutureType | null>(null);

export default CoinbaseProductsFuturesContext;

/* ---------------------------------------------------------------------------------------------- */
