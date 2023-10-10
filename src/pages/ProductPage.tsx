import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectStatus,
  sortAndFilter,
  startLoading,
  stopLoading,
} from "../redux/slices/productSlice";
import { Product } from "../types/productSlice";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import SelectCategory from "../components/SelectCategory";
import SelectPriceOrder from "../components/SelectPriceOrder";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import loadingSpin from "../assets/images/loading.gif"; //https://tenor.com/view/loading-loading-forever-bobux-loader-gif-18368917
import SearchBar from "../components/SearchBar";
import SelectItemsPerPage from "../components/SelectItemsPerPage";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Check for changes in price order or category
  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      sortAndFilter({
        priceOrder: priceOrder,
        category: chosenCategory,
      })
    );
    setPageNumber(1);
    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, [chosenCategory, priceOrder, dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const selectedPage = value;
    setPageNumber(selectedPage);
    window.scrollTo({
      top: 0, // scrolls to the top
      behavior: "smooth", // makes the scroll smooth instead of abrupt
    });
  };

  // Display all products or in category
  const renderAllProducts = () => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = pageNumber * itemsPerPage;
    console.log("startIndex: ", startIndex, " endIndex: ", endIndex);
    return (
      <>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={2}>
            <Typography variant="h4">
              {chosenCategory === "" ? "All Items" : chosenCategory}
            </Typography>
            {status === "loading" ? (
              <img src={loadingSpin} alt="" style={{ height: "40px" }} />
            ) : (
              <></>
            )}
          </Stack>
          <SelectItemsPerPage setItemsPerPage={setItemsPerPage} />
          <SelectPriceOrder setPriceOrder={setPriceOrder} />
        </Stack>
        <Grid container spacing={2} sx={{ paddingBottom: "30px" }}>
          {products.slice(startIndex, endIndex).map((product) => {
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
      sx={{ padding: isLargeScreen ? "20px 40px" : "20px 100px" }}
      gap={"30px"}
    >
      <Stack
        sx={{
          maxWidth: isMediumScreen ? "100%" : "15vw",
          borderRight: !isMediumScreen ? "3px solid #E69F56" : "none",
          paddingRight: !isMediumScreen ? "50px" : "0px",
        }}
      >
        {isSmallScreen && <SearchBar />}
        <SelectCategory setChosenCategory={setChosenCategory} />
      </Stack>
      <Stack
        sx={{
          padding: "0 20px",
        }}
      >
        {renderAllProducts()}
        <Pagination
          count={totalPages}
          page={pageNumber}
          color="primary"
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Stack>
  );
}
