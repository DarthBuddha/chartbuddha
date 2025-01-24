/* ---------------------------------------------------------------------------------------------- */
//! # Entities: App Database Entities - ticker
/* ---------------------------------------------------------------------------------------------- */
//! #### Entity:
//! * ticker
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/database/entities/ticker.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaOrm
use sea_orm::entity::prelude::*;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel)]
#[sea_orm(table_name = "ticker")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub ticker_id: i32,
  // pub name: String,
  #[sea_orm(foreign_key)]
  pub subscription_id: Option<i32>,
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

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
  #[sea_orm(
    belongs_to = "super::subscription::Entity",
    from = "Column::SubscriptionId",
    to = "super::subscription::Column::SubscriptionId"
  )]
  Subscription,
}

impl Related<super::subscription::Entity> for Entity {
  fn to() -> RelationDef {
    Relation::Subscription.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
