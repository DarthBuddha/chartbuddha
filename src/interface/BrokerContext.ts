/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha - Frontend
/* ---------------------------------------------------------------------------------------------- */
//! # Interface: BrokerContext
/* ---------------------------------------------------------------------------------------------- */
//! #### Description:
//! * This context is responsible for managing the Broker Context.
/* ---------------------------------------------------------------------------------------------- */
//! #### Interface:
//! * BrokerApiInterface
//! * BrokerDataApiInterface
//! * BrokerDataApiPermissionsInterface
//! * BrokerProductsInterface
//! * BrokerSessionInterface
//! * BrokerMaintenanceInterface
//! * BrokerFutureInterface
//! * BrokerPerpetualInterface
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path:
//! * src/interface/BrokerContext.ts
/* ---------------------------------------------------------------------------------------------- */

// React
import { createContext } from 'react'
/* ---------------------------------------------------------------------------------------------- */

export interface BrokerInterface {
  broker_api_binance?: BrokerApiInterface | null
  broker_api_coinbase?: BrokerApiInterface | null
}

/* ---------------------------------------------------------------------------------------------- */

export interface BrokerApiInterface {
  broker_data_api?: BrokerDataApiInterface | null
  broker_products?: BrokerProductsInterface[] | null
}

/* ---------------------------------------------------------------------------------------------- */

export interface BrokerDataApiInterface {
  api_key?: string
  api_key_secret?: string
  api_permissions?: BrokerDataApiPermissionsInterface
}

export interface BrokerDataApiPermissionsInterface {
  can_view?: boolean
  can_trade?: boolean
  can_transfer?: boolean
  portfolio_uuid?: string
  portfolio_type?: string
}

/* ---------------------------------------------------------------------------------------------- */

export interface BrokerProductsInterface {
  product_id?: string
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
  fcm_trading_session_details?: BrokerSessionInterface // object
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
  future_product_details?: BrokerFutureInterface // object
  num_products?: number
}

export interface BrokerSessionInterface {
  is_session_open: boolean
  open_time: string // RFC3339 Timestamp
  close_time: string // RFC3339 Timestamp
  session_state: string
  after_hours_order_entry_disabled: boolean
  closed_reason: string
  maintenance: BrokerMaintenanceInterface // Object
}

export interface BrokerMaintenanceInterface {
  start_time: string // RFC3339 Timestamp
  end_time: string // RFC3339 Timestamp
}

export interface BrokerFutureInterface {
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
  perpetual_details: BrokerPerpetualInterface // object
  contract_display_name: string
  time_to_expiry_ms: number
  non_crypto: boolean
  contract_expiry_name: string
  twenty_four_by_seven: boolean
}

export interface BrokerPerpetualInterface {
  open_interest: string
  funding_rate: string
  funding_time: string // RFC3339 Timestamp
  max_leverage: string
  base_asset_uuid: string
  underlying_type: string
}

/* ---------------------------------------------------------------------------------------------- */

const BrokerContext = createContext<BrokerApiInterface | null>(null)

export { BrokerContext }

/* ---------------------------------------------------------------------------------------------- */
