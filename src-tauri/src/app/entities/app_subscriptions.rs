/* ---------------------------------------------------------------------------------------------- */
//! # App Entities: app_subscriptions Module
/* ---------------------------------------------------------------------------------------------- */
//! #### Entities:
//! * app_subscriptions
/* ---------------------------------------------------------------------------------------------- */
//! ##### app/entities/app_subscriptions.rs
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use sea_orm::entity::prelude::*;
use sea_orm::prelude::DateTime;
use sea_orm::prelude::DateTimeWithTimeZone;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "subscriptions")]
pub struct Model {
  #[sea_orm(primary_key)]
  // Primary key
  pub id: i32,
  // Subscription: Data
  pub subscription_type: String, // --> broker, market, news
  pub platform: String,          // -----------> Platform Name / Api Name
  pub exchange: String,          // -----------> equity, future, spot, perpetual
  pub symbol: String,            // -------------> Symbol Name / Product ID
  // Subscription: Settings
  pub tick: f64,          // ------------------> Tick Interval
  pub granularity: f64,   // -----------> Granularity
  pub historical: String, // ---------> Historical Data
  // Housekeeping
  pub created_at: DateTimeWithTimeZone,
  pub updated_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
  CoinbaseTicker,
}

impl RelationTrait for Relation {
  fn def(&self) -> RelationDef {
    match self {
      Self::CoinbaseTicker => Entity::has_many(super::coinbase_ticker::Entity).into(),
    }
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
