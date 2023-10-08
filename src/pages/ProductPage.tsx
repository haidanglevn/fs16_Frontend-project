import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectStatus,
  sortAndFilter,
} from "../redux/slices/productSlice";
import { Product } from "../types/types";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import SelectCategory from "../components/SelectCategory";
import SelectPriceOrder from "../components/SelectPriceOrder";
import { Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Loading from "../components/Loading";
import hourglass from "../assets/images/loading.gif";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

  const status = useSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // Check for changes in price order or category
  useEffect(() => {
    dispatch(
      sortAndFilter({
        priceOrder: priceOrder,
        category: chosenCategory,
      })
    );
  }, [chosenCategory, priceOrder, dispatch]);

  // Display all products or in category
  const renderAllProducts = () => {
    return (
      <>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={2}>
            <Typography variant="h4">
              {chosenCategory === "" ? "Trending Items" : chosenCategory}
            </Typography>
            {status === "loading" ? (
              <img src={hourglass} alt="" style={{ height: "40px" }} />
            ) : (
              <></>
            )}
          </Stack>

          <SelectPriceOrder setPriceOrder={setPriceOrder} />
        </Stack>
        <Grid container spacing={2}>
          {products.map((product) => {
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={3}
                xl={2}
                key={product.id}
                mt={2}
                sx={{ filter: status === "loading" ? "blur(10px)" : "none" }}
              >
                <ProductCard product={product} />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  };

  return (
    <Stack
      direction={isMediumScreen ? "column" : "row"}
      style={{ padding: isLargeScreen ? "20px 40px" : "20px 100px" }}
      gap={"30px"}
    >
      <Stack
        sx={{
          maxWidth: isMediumScreen ? "100%" : "15vw",
          borderRight: !isMediumScreen ? "3px solid #E69F56" : "none",
          paddingRight: !isMediumScreen ? "50px" : "0px",
        }}
      >
        {!isMediumScreen && <Typography variant="h4">Filter</Typography>}
        <SelectCategory setChosenCategory={setChosenCategory} />
      </Stack>
      <Stack
        sx={{
          padding: "0 20px",
        }}
      >
        {renderAllProducts()}
      </Stack>
    </Stack>
  );
}
