import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByName,
  selectSearchResult,
} from "../redux/slices/productSlice";
import { AppDispatch } from "../redux/store";
import { Product } from "../types/productSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useScreenSizes } from "../hooks/useScreenSizes";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const { isSmallScreen } = useScreenSizes();
  const dispatch = useDispatch<AppDispatch>();
  const searchResult: Product[] = useSelector(selectSearchResult);
  const theme = useTheme();

  // Search by name feature
  const handleSearch = (event: any, newValue: string | null) => {
    setSearch(newValue || "");
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  useEffect(() => {
    dispatch(filterProductsByName(debounceSearch));
  }, [debounceSearch, dispatch]);

  return (
    <Box
      mb={2}
      sx={{
        minWidth: !isSmallScreen ? "300px" : "100%",
        width: "30vw",
        height: "40px",
      }}
    >
      <Autocomplete
        freeSolo
        options={searchResult}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        noOptionsText="No product found"
        onInputChange={handleSearch}
        renderInput={(params) => (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ height: "60px" }}
          >
            <TextField
              {...params}
              placeholder="Search for a product 🔍"
              variant="outlined"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                "& .MuiOutlinedInput-root": {
                  height: "40px", // Sets the height
                  color: "white",
                  backgroundColor: theme.palette.secondary.main,
                  "& .MuiOutlinedInput-input": {
                    padding: "0px 10px",
                  },
                },
              }}
            />
          </Stack>
        )}
        renderOption={(props, option) => (
          <Box sx={{ borderBottom: "1px solid gray", padding: "10px" }}>
            <Link
              to={`/product/${option.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
              key={option.id}
            >
              {option.title} - ${option.price} - {option.category.name}
            </Link>
          </Box>
        )}
      />
    </Box>
  );
}
