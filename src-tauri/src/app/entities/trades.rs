/* ---------------------------------------------------------------------------------------------- */
//! entities/trades_table.rs
/* ---------------------------------------------------------------------------------------------- */
//! Entities
//! - trades_table
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use sea_orm::entity::prelude::*;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "trades")]
pub struct Model {
    #[sea_orm(primary_key)]
    // Primary key
    pub id: i32,
    // Foreign key
    pub subscription_id: i32,
    // Record id
    pub trade_id: String,
    // Trade: Meta Data
    pub price: Decimal,
    pub volume: Decimal,
    pub side: String,
    pub timestamp: DateTime,
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
