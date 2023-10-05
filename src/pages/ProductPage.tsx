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
import { Stack, Typography } from "@mui/material";

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
    <Stack direction={"row"} style={{ padding: "20px 100px" }} gap={"30px"}>
      <Stack
        sx={{
          position: "sticky",
          width: "40vw",
          borderRight: "3px solid #E69F56",
          paddingRight: "50px",
        }}
      >
        <Typography variant="h4">Filter</Typography>
        <SelectCategory setChosenCategory={setChosenCategory} />
      </Stack>
      <Stack sx={{ padding: "0 20px" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h4">Trending items</Typography>
          <SelectPriceOrder setPriceOrder={setPriceOrder} />
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          mt={2}
        >
          {status === "loading" ? <p>Loading</p> : <></>}
          {renderAllProducts()}
        </Stack>
      </Stack>
    </Stack>
  );
}
