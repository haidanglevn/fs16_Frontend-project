import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productSlice,
  selectProducts,
  // selectError,
  selectStatus,
  selectSearchResult,
  fetchProducts,
  fetchCategories,
  selectCategories,
  selectFilteredByCategory,
} from "../redux/slices/productSlice";
import { Category, Product } from "../types/types";
import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import SelectCategory from "../components/SelectCategory";
import SelectPriceOrder from "../components/SelectPriceOrder";

export default function ProductPage() {
  const products: Product[] = useSelector(selectProducts);
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const searchResult: Product[] = useSelector(selectSearchResult);
  // const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const filteredProductsByCategory = useSelector(selectFilteredByCategory);

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  console.log(filteredProductsByCategory);

  // Fetch data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
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

  // Display all products or in category
  const renderAllProducts = () => {
    if (chosenCategory === "") {
      return products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      });
    } else {
      const index = filteredProductsByCategory.findIndex(
        (category) => category.name === chosenCategory
      );
      if (index !== -1) {
        return filteredProductsByCategory[index].products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        });
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
      <SelectPriceOrder />
      <SelectCategory setChosenCategory={setChosenCategory} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {status === "loading" ? <p>Loading</p> : <></>}
        {renderAllProducts()}
      </div>
    </>
  );
}
