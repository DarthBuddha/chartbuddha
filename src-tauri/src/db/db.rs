/* ---------------------------------------------------------------------------------------------- */
//! # ChartBuddha Library
/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Database - database
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * setup_database
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/database/database.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaOrm
use sea_orm::ConnectionTrait;
use sea_orm::Database;
use sea_orm::Schema;
use sea_orm::DbErr;
use sea_orm::DbBackend;
use sea_orm::Statement;
// use sea_orm::EntityName;
// use sea_orm::sea_query::ColumnDef;
// use sea_orm::sea_query::ForeignKeyCreateStatement;
// use sea_orm::sea_query::Table;
// use sea_orm::sea_query::*;
// Dependencies
use log::info;
// Crates
use crate::db::entities::subscription;
use crate::db::entities::ticker;

/* ---------------------------------------------------------------------------------------------- */

pub const DB_NAME: &str = "chartbuddha";
pub const DATABASE_URL: &str = "postgres://postgres:DB@localhost:5432/chartbuddha";

/* ---------------------------------------------------------------------------------------------- */

pub async fn setup_database() -> Result<(), DbErr> {
  info!("Setup Database...");
  let db = Database::connect(DATABASE_URL).await?;

  match db.get_database_backend() {
    DbBackend::MySql => {
      db.execute(
        Statement::from_string(
          db.get_database_backend(),
          format!("CREATE DATABASE IF NOT EXISTS `{}`;", DB_NAME)
        )
      ).await?;
    }
    DbBackend::Postgres => {
      let db_exists = db
        .query_one(
          Statement::from_string(
            db.get_database_backend(),
            format!("SELECT 1 FROM pg_database WHERE datname = '{}';", DB_NAME)
          )
        ).await?
        .is_some();

      if !db_exists {
        db.execute(
          Statement::from_string(
            db.get_database_backend(),
            format!("CREATE DATABASE \"{}\";", DB_NAME)
          )
        ).await?;
      }
    }
    DbBackend::Sqlite => {}
  }

  let builder = db.get_database_backend();
  let schema = Schema::new(builder);

  // Check for Table: Subscription
  let subscription_exists = db
    .query_one(
      Statement::from_string(
        db.get_database_backend(),
        "SELECT 1 FROM information_schema.tables WHERE table_name = 'subscription';".to_string()
      )
    ).await?
    .is_some();

  if !subscription_exists {
    // Create Table: Subscription
    db.execute(builder.build(&schema.create_table_from_entity(subscription::Entity))).await?;
  }

  // Check for Table: Ticker
  let ticker_exists = db
    .query_one(
      Statement::from_string(
        db.get_database_backend(),
        "SELECT 1 FROM information_schema.tables WHERE table_name = 'ticker';".to_string()
      )
    ).await?
    .is_some();

  if !ticker_exists {
    // Create Table: Ticker
    db.execute(builder.build(&schema.create_table_from_entity(ticker::Entity))).await?;
  }

  info!("Database Setup successfully.");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
