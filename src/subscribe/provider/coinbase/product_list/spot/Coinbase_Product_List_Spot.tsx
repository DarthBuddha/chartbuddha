//! # Coinbase Product List Spot
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
import { Product_Type } from "../../../../interface/Product_Type";
import { useSubscriptionContext } from "../../../../interface/Interface_Subscribe";
// CSS Modules
import Style from "../Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
const Coinbase_Product_List_Spot: React.FC = () => {
  const { setSelectedProduct } = useSubscriptionContext();
  const [spotProducts, setSpotProducts] = useState<Product_Type[]>([]);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };

  // Function to load products from the Tauri store
  const loadSpotProducts = useCallback(async () => {
    try {
      const store_coinbase_products = await load("coinbase_products.json");
      const allProducts = (await store_coinbase_products.get("products")) as { SPOT?: Product_Type[] } || {};
      const spotProducts = allProducts?.SPOT || [];
      setSpotProducts(spotProducts);
      info("Spot products loaded successfully.");
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    // Initial load of products
    loadSpotProducts();

    // Listen for `coinbase_products_loaded` event
    const unlisten = listen("coinbase_products_loaded", async (event) => {
      info("Event received: " + event.payload);
      // Reload products when the event is received
      await loadSpotProducts();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten.then((f) => f());
    };
  }, [loadSpotProducts]);

  useEffect(() => {
    // Initial load of products
    loadSpotProducts();

    // Listen for `coinbase_products_updated` event
    const unlisten = listen("coinbase_products_updated", async (event) => {
      info("Event received: " + event.payload);
      // Reload products when the event is received
      await loadSpotProducts();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten.then((f) => f());
    };
  }, [loadSpotProducts]);

  const getStyleForValue = (value: string) => {
    return parseFloat(value) >= 0 ? Style.Positive : Style.Negative;
  };

  //
  return (
    <div className={Style.List_Container}>
      <div className={Style.List}>
        <div className={Style.List_Content}>
          {spotProducts.map((product, index) => (
            <div
              key={index}
              className={Style.Product}
              onClick={() => setSelectedProduct(product)} // Set selected product
            >
              <div>{product.display_name}</div>
              <div>Price: <span className={getStyleForValue(product.price)}>{product.price}</span></div>
              <div>24h Change: <span className={getStyleForValue(product.price_percentage_change_24h)}>{product.price_percentage_change_24h}%</span></div>
              <div>Status: {product.status}</div>
              <div>Volume (24h): {product.volume_24h}</div>
              <div>Volume Change (24h): <span className={getStyleForValue(product.volume_percentage_change_24h)}>{product.volume_percentage_change_24h}%</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
//
export default Coinbase_Product_List_Spot;
//
/* ---------------------------------------------------------------------------------- */
