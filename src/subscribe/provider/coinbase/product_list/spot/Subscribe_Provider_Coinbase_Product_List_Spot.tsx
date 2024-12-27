//! # Subscribe_Product_Coinbase_Product_List_Spot
//!
/* ---------------------------------------------------------------------------------- */
//
// React
import React, { useEffect, useState } from "react";
// Tauri
import { load } from "@tauri-apps/plugin-store";
import { info, error } from "@tauri-apps/plugin-log";
// Components
// import { useSubscriptionContext } from "../../../../interface/Interface_Subscribe";
import { Product_Type } from "../../../../interface/Product_Type";
// CSS Modules
import Style from "../Subscribe_Provider_Coinbase_Product_List.module.css";
//
/* ---------------------------------------------------------------------------------- */
//
const Coinbase_Spot: React.FC = () => {
  const [spotProducts, setSpotProducts] = useState<Product_Type[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product_Type | null>(null);
  //
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred");
    }
  };
  //
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const store_coinbase_products = await load("coinbase_products.json");
        const allProducts = (await store_coinbase_products.get("products")) as { SPOT?: Product_Type[] } || {};
        const spotProducts = allProducts?.SPOT || [];
        setSpotProducts(spotProducts);
      } catch (err) {
        handleError(err);
      }
    };
    loadProducts();
  }, []);
  //
  console.log(spotProducts); // Log the products to verify
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
              {product.display_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
//
export default Coinbase_Spot;
//
/* ---------------------------------------------------------------------------------- */
