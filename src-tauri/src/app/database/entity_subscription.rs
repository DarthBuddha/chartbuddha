/* ---------------------------------------------------------------------------------------------- */
//! # Entities: App Entities - entity_subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Entity:
//! * entity_subscription
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/entities/entity_subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// Rust
use std::str::FromStr;
// SeaOrm
use sea_orm::entity::prelude::*;
// Crates
use crate::app::database::entity_ticker;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "subscription")]
pub struct Model {
  #[sea_orm(primary_key, auto_increment = true)]
  // Primary key
  pub id: i32,
  // Subscription: Data
  pub subscription_type: Option<SubscriptionType>, // --> broker, market, news
  pub exchange_type: Option<ExchangeType>, // ----------> equity, future, spot, perpetual
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

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(StringLen::N(1))")]
pub enum SubscriptionType {
  #[sea_orm(string_value = "broker")]
  Broker,
  #[sea_orm(string_value = "market")]
  Market,
  #[sea_orm(string_value = "news")]
  News,
}

impl FromStr for SubscriptionType {
  type Err = ();

  fn from_str(input: &str) -> Result<SubscriptionType, Self::Err> {
    match input {
      "broker" => Ok(SubscriptionType::Broker),
      "market" => Ok(SubscriptionType::Market),
      "news" => Ok(SubscriptionType::News),
      _ => Err(()),
    }
  }
}

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(StringLen::N(1))")]
pub enum ExchangeType {
  #[sea_orm(string_value = "equity")]
  Equity,
  #[sea_orm(string_value = "future")]
  Future,
  #[sea_orm(string_value = "spot")]
  Spot,
  #[sea_orm(string_value = "perpetual")]
  Perpetual,
}

impl FromStr for ExchangeType {
  type Err = ();

  fn from_str(input: &str) -> Result<ExchangeType, Self::Err> {
    match input {
      "equity" => Ok(ExchangeType::Equity),
      "future" => Ok(ExchangeType::Future),
      "spot" => Ok(ExchangeType::Spot),
      "perpetual" => Ok(ExchangeType::Perpetual),
      _ => Err(()),
    }
  }
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
  Ticker,
}

impl RelationTrait for Relation {
  fn def(&self) -> RelationDef {
    match self {
      Self::Ticker => Entity::has_many(entity_ticker::Entity).into(),
    }
  }
}

impl Related<entity_ticker::Entity> for Entity {
  fn to() -> RelationDef {
    Relation::Ticker.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}

/* ---------------------------------------------------------------------------------------------- */
