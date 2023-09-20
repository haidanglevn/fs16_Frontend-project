import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectError,
  selectStatus,
  fetchProducts,
} from "./productSlice";
import { Product } from "../../types/types";
import { AppDispatch } from "../../app/store";
import ProductCard from "../../components/ProductCard";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  console.log(products);
  return (
    <>
      <h2>Product page</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products ? (
          products.map((product) => {
            return <ProductCard product={product} />;
          })
        ) : (
          <p>{error}: Could not fetch products data.</p>
        )}
      </div>
    </>
  );
}
