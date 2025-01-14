use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "orders")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub id: i32,
  pub subscription_id: i32,
  pub price: Decimal,
  pub volume: Decimal,
  pub side: String,
  pub timestamp: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
  fn def(&self) -> RelationDef {
    panic!("No RelationDef")
  }
}

impl ActiveModelBehavior for ActiveModel {}
