import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  Category,
  FilteredProductsByCategory,
  Product,
} from "../../types/types";
import { mockCategory, mockProducts } from "../mockData";

export type AsyncThunkStatus = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as AsyncThunkStatus,
  error: null as string | null | undefined,
  searchResult: [] as Product[],
  categories: [] as Category[],
  products: [] as Product[],
  productsCopy: [] as Product[], // keep as a copy for reset
  filteredByCategory: [] as FilteredProductsByCategory[],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data; // because there are too many fake data, has to change back later.
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return response.data;
  }
);

export const filterProductsByName = (
  state: typeof initialState,
  action: PayloadAction<string>
) => {
  if (action.payload !== "") {
    const searchTerm = action.payload.toLowerCase();
    state.searchResult = state.products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  } else {
    state.searchResult = [];
  }
};

interface FilterFunctionPayload {
  priceOrder: "asc" | "desc";
  category?: string; // assuming category is a string, adjust the type as needed
}

export const filterAndSort = (
  state: typeof initialState,
  action: PayloadAction<FilterFunctionPayload>
) => {
  const { priceOrder, category } = action.payload;

  state.products = state.productsCopy; //Reset the products array back to the origin
  // For category
  if (category !== "") {
    state.products = state.products.filter(
      (product: Product) => product.category.name === category
    );
  } else {
    state.products = state.productsCopy;
  }

  // For price order
  if (priceOrder === "asc") {
    state.products = state.products.sort((a, b) => a.price - b.price);
  } else if (priceOrder === "desc") {
    state.products = state.products.sort((a, b) => b.price - a.price);
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterAndSort,
    filterProductsByName,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = mockProducts;
        state.productsCopy = mockProducts;
        // state.products = action.payload;
        // state.productsCopy = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = mockCategory;
        // state.categories = action.payload;
        const array = state.categories.map((category: Category) => ({
          name: category.name,
          products: state.products.filter(
            (product: Product) => product.category.id === category.id
          ),
        }));
        state.filteredByCategory = array;
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectSearchResult = (state: RootState) =>
  state.product.searchResult;
export const selectStatus = (state: RootState) => state.product.status;
export const selectError = (state: RootState) => state.product.error;
export const selectCategories = (state: RootState) => state.product.categories;
export const selectFilteredByCategory = (state: RootState) =>
  state.product.filteredByCategory;

export default productSlice.reducer;
