//! # Coinbase Product List Perpetual
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useEffect, useState, useCallback } from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { listen } from "@tauri-apps/api/event";
import { info, error } from "@tauri-apps/plugin-log";
// Components
import { Product_Type } from "interface/type/Product_Type";
import { useInterface_Context } from "interface/Interface_Context";
// CSS Modules
import Style from "./Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
const Coinbase_Product_List_Perpetual: React.FC = () => {
  const { setSelectedProduct } = useInterface_Context();
  const [perpetualProducts, setPerpetualProducts] = useState<Product_Type[]>([]);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };

  // Function to load products from the Tauri store
  const loadPerpetualProducts = useCallback(async () => {
    try {
      const store_coinbase_products = await load("coinbase_products.json");
      const allProducts = (await store_coinbase_products.get("products")) as { PERPS?: Product_Type[] } || {};
      const perpetualProducts = allProducts?.PERPS || [];
      setPerpetualProducts(perpetualProducts);
      info("Perpetual products loaded successfully.");
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    // Initial load of products
    loadPerpetualProducts();

    // Listen for `coinbase_products_loaded` event
    const unlisten = listen("coinbase_products_loaded", async (event) => {
      info("Event received: " + event.payload);
      // Reload products when the event is received
      await loadPerpetualProducts();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten.then((f) => f());
    };
  }, [loadPerpetualProducts]);

  //
  return (
    <div className={Style.List_Container}>
      <div className={Style.List}>
        <div className={Style.List_Content}>
          {perpetualProducts.map((product, index) => (
            <div
              key={index}
              className={Style.Product}
              onClick={() => setSelectedProduct(product)} // Set selected product
            >
              {product.display_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
//
export default Coinbase_Product_List_Perpetual;
//
/* ---------------------------------------------------------------------------------- */
