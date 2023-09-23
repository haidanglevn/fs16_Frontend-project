import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productSlice,
  selectProducts,
  selectError,
  selectStatus,
  selectSearchResult,
  fetchProducts,
} from "../redux/slices/productSlice";
import { Product } from "../types/types";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const searchResult: Product[] = useSelector(selectSearchResult);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);

  // Fetch data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Search by name feature
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    dispatch(productSlice.actions.filterProductsByName(debounceSearch));
  }, [debounceSearch, dispatch]);

  // Handle the change event for the select element
  const handleSortChange = (event: any) => {
    if (event.target.value === "") {
      setPriceOrder(null);
    } else {
      setPriceOrder(event.target.value);
    }
  };

  useEffect(() => {
    dispatch(productSlice.actions.sortByPrice(priceOrder));
  }, [priceOrder, dispatch]);

  // Display the search result
  const renderSearchResult = () => {
    if (debounceSearch === "") {
      return <p>Start typing to search product by name</p>;
    } else {
      if (searchResult.length !== 0) {
        return (
          <>
            <p>Search result: </p>
            {searchResult.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
          </>
        );
      } else {
        return <p>No product found</p>;
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="search">Search for Product: </label>
        <input type="text" id="search" value={search} onChange={handleSearch} />
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {renderSearchResult()}
      </div>
      <h2>Product page</h2>
      <select id="sortByPrice" onChange={handleSortChange}>
        <option value="" defaultChecked>
          order
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {status === "loading" ? <p>Loading</p> : <></>}
        {products ? (
          products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        ) : (
          <p>No product found</p>
        )}
      </div>
    </>
  );
}
