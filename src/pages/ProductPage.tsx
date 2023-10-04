import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  // selectError,
  selectStatus,
  filterAndSort,
} from "../redux/slices/productSlice";
import { Product } from "../types/types";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import SelectCategory from "../components/SelectCategory";
import SelectPriceOrder from "../components/SelectPriceOrder";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

  const status = useSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();

  // Check for changes in price order or category
  useEffect(() => {
    dispatch(
      filterAndSort({
        priceOrder: priceOrder,
        category: chosenCategory,
      })
    );
  }, [chosenCategory, priceOrder, dispatch]);

  // Display all products or in category
  const renderAllProducts = () => {
    return products.map((product) => {
      return <ProductCard product={product} key={product.id} />;
    });
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <h2>Product page</h2>
      <SelectPriceOrder setPriceOrder={setPriceOrder} />
      <SelectCategory setChosenCategory={setChosenCategory} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {status === "loading" ? <p>Loading</p> : <></>}
        {renderAllProducts()}
      </div>
    </div>
  );
}
