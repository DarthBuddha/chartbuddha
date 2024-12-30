//! # Subscribe Product Coinbase
//!
/* ------------------------------------------------------------------------------------------------------------------ */
//
// React
import React, { useEffect } from 'react';
import Split from 'react-split';
// Tauri
import { invoke } from '@tauri-apps/api/core';
// Components
import Coinbase_Product from './product/Coinbase_Product';
import Coinbase_Product_List from './product_list/Coinbase_Product_List';
// CSS Modules
import Style from './Coinbase_Subscribe.module.css';
//
/* ------------------------------------------------------------------------------------------------------------------ */
//
const POLLING_INTERVAL = 5000; // 5 seconds
//
const Coinbase_Subscribe: React.FC = () => {
  //
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await invoke('coinbase_list_products');
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };

    const intervalId = setInterval(() => {
      // if (document.hasFocus()) {
      loadProducts();
      // }
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //
  return (
    <div className={Style.Page}>
      <Split
        className={Style.Split}
        sizes={[90, 10]}
        minSize={[400, 160]}
        maxSize={[Infinity, 650]} // Set max size only for the right panel
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={20}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={Style.Coinbase_Product}>
          <Coinbase_Product />
        </div>
        <div className={Style.Coinbase_Product_List}>
          <Coinbase_Product_List />
        </div>
      </Split>
    </div>
  );
};

export default Coinbase_Subscribe;
//
/* ------------------------------------------------------------------------------------------------------------------ */
