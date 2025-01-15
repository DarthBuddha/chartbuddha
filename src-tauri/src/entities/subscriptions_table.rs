/* ------------------------------------------------------------------------------------------------------------------ */
//! entities/subscriptions_table.rs
/* ------------------------------------------------------------------------------------------------------------------ */
//! Entities
//! - subscriptions_table
/* ------------------------------------------------------------------------------------------------------------------ */

// Dependencies
use sea_orm::entity::prelude::*;

/* ------------------------------------------------------------------------------------------------------------------ */

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "subscriptions")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub id: i32,
  pub product_id: String,
  pub created_at: DateTime,
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

/* ------------------------------------------------------------------------------------------------------------------ */
