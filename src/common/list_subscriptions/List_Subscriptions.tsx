//! # List Subscriptions
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React from 'react';
// Components
import { useInterfaceContext } from 'interface/Interface_Context';
// CSS Modules
import Style from './List_Subscriptions.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
const List_Subscriptions: React.FC = () => {
  const { selectedProvider } = useInterfaceContext();
  console.log(selectedProvider);

  const { selectedProduct } = useInterfaceContext();
  console.log(selectedProduct);

  return (
    <div className={Style.Page}>
      <div className={Style.Title}>Subscriptions</div>
      <div className={Style.List_Subscriptions}>Subscriptions</div>
    </div>
  );
};

export default List_Subscriptions;
/* ------------------------------------------------------------------------------------------------------------------ */
