/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Subscriber Common - db_subscription
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * save_subscription_to_db
//! * delete_subscription_from_db
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/subscriber/common/db_subscription.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaOrm
use sea_orm::Database;
use sea_orm::DbErr;
use sea_orm::Set;
use sea_orm::DatabaseConnection;
use sea_orm::ActiveModelTrait;
use sea_orm::EntityTrait;
use sea_orm::QueryFilter;
use sea_orm::ColumnTrait;
use sea_orm::ModelTrait;
// Dependencies
use log::info;
// Crates
use crate::app::db::db::DATABASE_URL;
use crate::app::db::entities::subscription;

/* ---------------------------------------------------------------------------------------------- */

/// Save the subscription to the database
pub async fn save_subscription_to_db(
  // app_handle: AppHandle<Wry>,
  subscription_type: String,
  exchange_type: String,
  platform: String,
  symbol: String,
  tick: f64,
  granularity: f64,
  historical: String
) -> Result<(), DbErr> {
  info!("Save Subscription to Database");
  let db: DatabaseConnection = Database::connect(DATABASE_URL).await?;

  // Save subscription to the database
  let new_subscription = subscription::ActiveModel {
    // Subscription: data
    subscription_type: Set(subscription_type.to_string()),
    exchange_type: Set(exchange_type.to_string()),
    platform: Set(platform.to_string()),
    symbol: Set(symbol.to_string()),
    // Subscription: settings
    tick: Set(tick), // Changed to tickSize
    granularity: Set(granularity), // Changed to granularity
    historical: Set(historical.to_string()),
    // Housekeeping fields
    created_at: Set(chrono::Utc::now().into()),
    updated_at: Set(chrono::Utc::now().naive_utc()),

    ..Default::default()
  };

  new_subscription.insert(&db).await?;

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */

/// Delete the subscription from the database
pub async fn delete_subscription_from_db(platform: String, symbol: String) -> Result<(), DbErr> {
  info!("Delete Subscription from Database");
  let db: DatabaseConnection = Database::connect(DATABASE_URL).await?;

  // Find the subscription to delete
  let subscription = subscription::Entity
    ::find()
    .filter(subscription::Column::Platform.eq(platform))
    .filter(subscription::Column::Symbol.eq(symbol))
    .one(&db).await?;

  if let Some(subscription) = subscription {
    subscription.delete(&db).await?;
    info!("Subscription Deleted from Database");
  } else {
    info!("Subscription not found");
  }

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
