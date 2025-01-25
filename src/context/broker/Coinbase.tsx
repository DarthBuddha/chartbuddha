/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha
/* ---------------------------------------------------------------------------------------------- */
//! # Context: Context Broker - Coinbase
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the Coinbase API.
/* ---------------------------------------------------------------------------------------------- */
//! #### Types:
//! * CoinbaseType
//! * DataApiType
//! * DataApiPermissionsType
//! * ProductsType
//! * SessionType
//! * MaintenanceType
//! * FutureType
//! * PerpetualType
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: context/broker/coinbase/Coinbase.tsx
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'

/* ---------------------------------------------------------------------------------------------- */

export interface CoinbaseType {
  coinbase_api: DataApiType
  coinbase_products: ProductsType[]
}

/* ---------------------------------------------------------------------------------------------- */

export interface DataApiType {
  api_key: string
  api_key_secret: string
  api_permissions: DataApiPermissionsType
}

// const DataApiContext = createContext<DataApiType | null>(null)

export interface DataApiPermissionsType {
  can_view: boolean
  can_trade: boolean
  can_transfer: boolean
  portfolio_uuid: string
  portfolio_type: string
}

// const DataApiPermissionsContext = createContext<DataApiPermissionsType | null>(null)

/* ---------------------------------------------------------------------------------------------- */

export interface ProductsType {
  product_id: string
  price?: string
  price_percentage_change_24h?: string
  volume_24h?: string
  volume_percentage_change_24h?: string
  base_increment?: string
  quote_increment?: string
  quote_min_size?: string
  quote_max_size?: string
  base_min_size?: string
  base_max_size?: string
  base_name?: string
  quote_name?: string
  watched?: boolean
  is_disabled?: boolean
  new?: boolean
  status?: string
  cancel_only?: boolean
  limit_only?: boolean
  post_only?: boolean
  trading_disabled?: boolean
  auction_mode?: boolean
  product_type?: string
  quote_currency_id?: string
  base_currency_id?: string
  fcm_trading_session_details?: SessionType // object
  mid_market_price?: string
  alias?: string
  alias_to?: string
  base_display_symbol?: string
  quote_display_symbol?: string
  view_only?: boolean
  price_increment?: string
  display_name?: string
  product_venue?: string
  approximate_quote_24h_volume?: string
  future_product_details?: FutureType // object
  num_products?: number
}

export interface SessionType {
  is_session_open: boolean
  open_time: string // RFC3339 Timestamp
  close_time: string // RFC3339 Timestamp
  session_state: string
  after_hours_order_entry_disabled: boolean
  closed_reason: string
  maintenance: MaintenanceType // Object
}

export interface MaintenanceType {
  start_time: string // RFC3339 Timestamp
  end_time: string // RFC3339 Timestamp
}

export interface FutureType {
  venue: string
  contract_code: string
  contract_expiry: string // RFC3339 Timestamp
  contract_size: string
  contract_root_unit: string
  group_description: string
  contract_expiry_timezone: string
  group_short_description: string
  risk_managed_by: string
  contract_expiry_type: string
  perpetual_details: PerpetualType // object
  contract_display_name: string
  time_to_expiry_ms: number
  non_crypto: boolean
  contract_expiry_name: string
  twenty_four_by_seven: boolean
}

export interface PerpetualType {
  open_interest: string
  funding_rate: string
  funding_time: string // RFC3339 Timestamp
  max_leverage: string
  base_asset_uuid: string
  underlying_type: string
}

/* ---------------------------------------------------------------------------------------------- */

const CoinbaseContext = createContext<CoinbaseType | null>(null)

export { CoinbaseContext }

/* ---------------------------------------------------------------------------------------------- */
