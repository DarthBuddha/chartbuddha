/* ---------------------------------------------------------------------------------------------- */
//! entities/subscriptions_table.rs
/* ---------------------------------------------------------------------------------------------- */
//! Entities
//! - subscriptions_table
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use sea_orm::entity::prelude::*;
// use sea_orm::prelude::Decimal;
use sea_orm::prelude::DateTimeWithTimeZone;
use sea_orm::prelude::DateTime;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "subscriptions")]
pub struct Model {
  #[sea_orm(primary_key)]
  // Primary key
  pub id: i32,
  // Subscription: Meta Data
  pub subscription_type: String, // --> broker, market, news
  pub platform: String, // -----------> Platform Name / Api Name
  pub exchange: String, // -----------> equity, future, spot, perpetual
  pub symbol: String, // -------------> Symbol Name / Product ID
  // Subscription: Settings
  pub tick: f64, // ---------> Tick Size
  pub granularity: f64, // -------> Granularity
  pub historical: String, // ---------> Historical Data
  // Housekeeping fields
  pub created_at: DateTimeWithTimeZone,
  pub updated_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
  fn def(&self) -> RelationDef {
    panic!("No RelationDef")
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
