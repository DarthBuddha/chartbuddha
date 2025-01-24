/* ---------------------------------------------------------------------------------------------- */
//! # Module: App Database - database
/* ---------------------------------------------------------------------------------------------- */
//! #### Functions:
//! * setup_database
/* ---------------------------------------------------------------------------------------------- */
//! ##### Path: app/database/database.rs
/* ---------------------------------------------------------------------------------------------- */

// SeaOrm
use sea_orm::sea_query::*;
use sea_orm::ConnectionTrait;
use sea_orm::Database;
use sea_orm::Schema;
use sea_orm::DbErr;
use sea_orm::DbBackend;
use sea_orm::Statement;
use sea_orm::EntityName;
// use sea_orm::sea_query::ColumnDef;
// use sea_orm::sea_query::ForeignKeyCreateStatement;
// use sea_orm::sea_query::Table;
// use sea_orm::sea_query::*;
// Dependencies
use log::info;
// Crates
use crate::app::database::entity_subscription;
use crate::app::database::entity_ticker;

/* ---------------------------------------------------------------------------------------------- */

pub const DB_NAME: &str = "chartbuddha";
pub const DATABASE_URL: &str = "postgres://postgres:DB@localhost:5432";

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

  // Create Table: Subscription
  assert_eq!(
    builder.build(&schema.create_table_from_entity(entity_subscription::Entity)),
    builder.build(
      &Table::create()
        .table(entity_subscription::Entity.table_ref())
        .col(ColumnDef::new(entity_subscription::Column::Id).integer().not_null().auto_increment())
        .col(ColumnDef::new(entity_subscription::Column::SubscriptionType).string_len(1))
        .col(ColumnDef::new(entity_subscription::Column::ExchangeType).string_len(1))
        .col(ColumnDef::new(entity_subscription::Column::Platform).string().not_null())
        .col(ColumnDef::new(entity_subscription::Column::Symbol).string().not_null())
        .col(ColumnDef::new(entity_subscription::Column::Tick).double().not_null())
        .col(ColumnDef::new(entity_subscription::Column::Granularity).double().not_null())
        .col(ColumnDef::new(entity_subscription::Column::Historical).string().not_null())
        .col(
          ColumnDef::new(entity_subscription::Column::CreatedAt)
            .timestamp_with_time_zone()
            .not_null()
        )
        .col(ColumnDef::new(entity_subscription::Column::UpdatedAt).timestamp().not_null())
        .primary_key(
          Index::create().name("pk-subscription").col(entity_subscription::Column::Id).primary()
        )
        .to_owned()
    )
  );

  // Create Table: Ticker
  assert_eq!(
    builder.build(&schema.create_table_from_entity(entity_ticker::Entity)),
    builder.build(
      &Table::create()
        .table(entity_ticker::Entity.table_ref())
        .col(ColumnDef::new(entity_ticker::Column::Id).integer().not_null().auto_increment())
        .col(ColumnDef::new(entity_ticker::Column::SubscriptionId).integer().not_null())
        .col(ColumnDef::new(entity_ticker::Column::TradeId).string().not_null())
        .col(ColumnDef::new(entity_ticker::Column::ProductId).string().not_null())
        .col(ColumnDef::new(entity_ticker::Column::Volume24H).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::Low24H).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::High24H).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::Low52W).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::High52W).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::PricePercentChg24H).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::BestBid).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::BestAsk).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::BestBidQuantity).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::BestAskQuantity).decimal().not_null())
        .col(ColumnDef::new(entity_ticker::Column::CreatedAt).timestamp_with_time_zone().not_null())
        .col(ColumnDef::new(entity_ticker::Column::UpdatedAt).timestamp().not_null())
        .primary_key(Index::create().name("pk-ticker_id").col(entity_ticker::Column::Id).primary())
        .foreign_key(
          ForeignKeyCreateStatement::new()
            .name("fk-ticker-subscription_id")
            .from_tbl(entity_ticker::Entity)
            .from_col(entity_ticker::Column::SubscriptionId)
            .to_tbl(entity_subscription::Entity)
            .to_col(entity_subscription::Column::Id)
        )
        .to_owned()
    )
  );

  info!("Database Setup successfully.");

  Ok(())
}

/* ---------------------------------------------------------------------------------------------- */
