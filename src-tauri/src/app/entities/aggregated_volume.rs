/* ---------------------------------------------------------------------------------------------- */
//! entities/aggregated_volume_table.rs
/* ---------------------------------------------------------------------------------------------- */
//! Entities
//! - aggregated_volume_table
/* ---------------------------------------------------------------------------------------------- */

// Dependencies
use sea_orm::entity::prelude::*;

/* ---------------------------------------------------------------------------------------------- */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "aggregated_volumes")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub subscription_id: i32,
    pub time_bucket: DateTime,
    pub total_volume: Decimal,
    pub buy_volume: Decimal,
    pub sell_volume: Decimal,
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
