/* ---------------------------------------------------------------------------------------------- */
//! # App Entities: Coinbase Ticker Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Entities:
//! * coinbase_ticker
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/entities/coinbase_ticker.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use sea_orm::entity::prelude::*;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "coinbase_ticker")]
pub struct Model {
  #[sea_orm(primary_key)]
  // Primary key
  pub id: i32,
  // Foreign key
  pub subscription_id: i32,
  // Record id
  pub trade_id: String,
  // Trade: Data
  pub product_id: String,
  pub volume_24_h: Decimal,
  pub low_24_h: Decimal,
  pub high_24_h: Decimal,
  pub low_52_w: Decimal,
  pub high_52_w: Decimal,
  pub price_percent_chg_24_h: Decimal,
  pub best_bid: Decimal,
  pub best_ask: Decimal,
  pub best_bid_quantity: Decimal,
  pub best_ask_quantity: Decimal,
  // Housekeeping fields
  pub created_at: DateTimeWithTimeZone,
  pub updated_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
  Subscription,
}

impl RelationTrait for Relation {
  fn def(&self) -> RelationDef {
    match self {
      Self::Subscription =>
        Entity::belongs_to(super::app_subscriptions::Entity)
          .from(Column::SubscriptionId)
          .to(super::app_subscriptions::Column::Id)
          .into(),
    }
  }
}

impl Related<super::app_subscriptions::Entity> for Entity {
  fn to() -> RelationDef {
    Relation::Subscription.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
