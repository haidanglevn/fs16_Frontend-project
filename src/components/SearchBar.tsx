import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByName,
  selectSearchResult,
} from "../redux/slices/productSlice";
import { AppDispatch } from "../redux/store";
import ProductCard from "./ProductCard";
import { Product } from "../types/productSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const searchResult: Product[] = useSelector(selectSearchResult);

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
        minWidth: "300px",
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

                "& .MuiOutlinedInput-root": {
                  height: "40px", // Sets the height
                  color: "black",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-input": {
                    padding: "0px 10px",
                  },
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #FF7D1A",
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
