/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Entities: App Database Entities - subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Entity:
//! * subscription
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/database/entities/subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaOrm
use sea_orm::entity::prelude::*;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "subscription")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub subscription_id: i32,
  // pub name: String,
  // Subscription: Data
  pub subscription_type: String, // --> broker, market, news
  pub exchange_type: String, // ----------> equity, future, spot, perpetual
  pub platform: String, // -----------------------------> Platform Name / Api Name
  pub symbol: String, // -------------------------------> Symbol Name / Product ID
  // Subscription: Settings
  pub tick: f64, // ------------------------------------> Tick Interval
  pub granularity: f64, // -----------------------------> Granularity
  pub historical: String, // ---------------------------> Historical Data
  // Housekeeping
  pub created_at: DateTimeWithTimeZone,
  pub updated_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
  #[sea_orm(has_many = "super::ticker::Entity")]
  Ticker,
}

impl Related<super::ticker::Entity> for Entity {
  fn to() -> RelationDef {
    Relation::Ticker.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
