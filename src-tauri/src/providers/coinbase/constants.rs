//! # ChartBuddha library
//! - Module: `constants`
//! - Description: Constants for the Coinbase provider.
//! ##### provider/coinbase/constants.rs
//
/* --------------------------------- < Start-Code > --------------------------------- */
/// Root resource for the API
pub const API_ROOT_URI: &str = "api.coinbase.com";

/// Accounts API constants
pub mod accounts {
    pub const RESOURCE_ENDPOINT: &str = "/api/v3/brokerage/accounts";
}

/// Convert API constants
pub mod convert {
    pub const RESOURCE_ENDPOINT: &str = "/api/v3/brokerage/convert";
    pub const QUOTE_ENDPOINT: &str = "/api/v3/brokerage/convert/quote";
}

/// Fees API constants
pub mod fees {
    pub const RESOURCE_ENDPOINT: &str = "/api/v3/brokerage/transaction_summary";
}

/// Orders API constants
pub mod orders {
    pub const RESOURCE_ENDPOINT: &str = "/api/v3/brokerage/orders";
    pub const CANCEL_BATCH_ENDPOINT: &str = "/api/v3/brokerage/orders/batch_cancel";
    pub const EDIT_ENDPOINT: &str = "/api/v3/brokerage/orders/edit";
    pub const EDIT_PREVIEW_ENDPOINT: &str = "/api/v3/brokerage/orders/edit_preview";
    pub const BATCH_ENDPOINT: &str = "/api/v3/brokerage/orders/historical/batch";
    pub const FILLS_ENDPOINT: &str = "/api/v3/brokerage/orders/historical/fills";
}

/// Products API constants
pub mod products {
    pub const CANDLE_MAXIMUM: u64 = 300;
    pub const RESOURCE_ENDPOINT: &str = "/api/v3/brokerage/products";
    pub const BID_ASK_ENDPOINT: &str = "/api/v3/brokerage/best_bid_ask";
    pub const PRODUCT_BOOK_ENDPOINT: &str = "/api/v3/brokerage/product_book";
}

/// Utils API constants
pub mod utils {
    pub const UNIXTIME_ENDPOINT: &str = "/api/v3/brokerage/time";
}

/// REST API constants
pub mod rest {
    pub const SERVICE: &str = "retail_rest_api_proxy";
}

/// Websocket API constants
pub mod websocket {
    pub const RESOURCE_ENDPOINT: &str = "wss://advanced-trade-ws.coinbase.com";

    /// Granularity of Candles from the WebSocket Candle subscription.
    /// NOTE: This is a restriction by CoinBase and cannot be currently changed (20240125)
    pub const GRANULARITY: u64 = 300;
    pub const SERVICE: &str = "public_websocket_api";
}

/// Amount of tokens per second refilled.
pub mod ratelimits {
    pub const REST_REFRESH_RATE: f64 = 30.0;
    pub const WEBSOCKET_REFRESH_RATE: f64 = 750.0;
}
//
/* ---------------------------------- < End--Code >---------------------------------- */
