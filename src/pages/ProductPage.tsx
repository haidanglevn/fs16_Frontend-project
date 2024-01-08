import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectStatus,
  sortPriceOrder,
  startLoading,
  stopLoading,
} from "../redux/slices/productSlice";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import SelectCategory from "../components/SelectCategory";
import SelectPriceOrder from "../components/SelectPriceOrder";
import { Grid, Pagination, Stack, Typography, useTheme } from "@mui/material";
import loadingSpin from "../assets/images/loading.gif"; //https://tenor.com/view/loading-loading-forever-bobux-loader-gif-18368917
import SearchBar from "../components/SearchBar";
import SelectItemsPerPage from "../components/SelectItemsPerPage";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { Product } from "../types/generalTypes";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const { isMediumScreen, isLargeScreen, isSmallScreen } = useScreenSizes();
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = pageNumber * itemsPerPage;

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = products;
    if (chosenCategory !== "") {
      filtered = products.filter(
        (product) => product.category.name === chosenCategory
      );
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } else {
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
    return filtered.slice(startIndex, endIndex);
  }, [chosenCategory, products, startIndex, endIndex, pageNumber]);

  const status = useSelector(selectStatus);
  // const status = "loading";
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  // Check for changes in price order or category
  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      sortPriceOrder({
        priceOrder: priceOrder,
      })
    );
    setPageNumber(1);
    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, [chosenCategory, priceOrder, dispatch]);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

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

  const renderAllProducts = () => {
    return (
      <>
        <Stack
          direction={isMediumScreen ? "column" : "row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "70vw" }}
        >
          <Stack direction={"row"} gap={2}>
            <Typography variant="h4" color={"text.primary"}>
              {chosenCategory === "" ? "All Items" : chosenCategory}
            </Typography>
            {status === "loading" ? (
              <img src={loadingSpin} alt="" style={{ height: "40px" }} />
            ) : (
              <></>
            )}
          </Stack>
          <Stack direction={"row"} gap={"50px"}>
            <SelectItemsPerPage setItemsPerPage={setItemsPerPage} />
            <SelectPriceOrder setPriceOrder={setPriceOrder} />
          </Stack>
        </Stack>
        <Grid
          container
          spacing={2}
          sx={{ paddingBottom: "30px", minHeight: "70vh" }}
        >
          {filteredProducts.map((product) => {
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
                sx={{
                  filter: status == "loading" ? "blur(10px)" : "none",
                }}
              >
                {filteredProducts.length === 0 ? (
                  <Typography color={"text.primary"}>
                    No products found
                  </Typography>
                ) : (
                  <ProductCard product={product} />
                )}
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
      sx={{
        padding: isLargeScreen ? "20px 40px" : "20px 100px",
        minHeight: "var(--body-min-height)",
        backgroundColor: theme.palette.background.paper,
      }}
      gap={"30px"}
    >
      <Stack
        sx={{
          maxWidth: isMediumScreen ? "100%" : "15vw",
          borderRight: !isMediumScreen
            ? `2px solid ${theme.palette.text.primary}`
            : "none",
          paddingRight: !isMediumScreen ? "50px" : "0px",
        }}
      >
        {isMediumScreen && <SearchBar />}
        <SelectCategory setChosenCategory={setChosenCategory} />
      </Stack>
      <Stack
        sx={{
          padding: "0 20px",
          minWidth: isMediumScreen ? "auto" : "calc(65vw)",
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
