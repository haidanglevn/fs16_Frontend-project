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

export interface ProductState {
  status: AsyncThunkStatus;
  error: string;
  searchResult: Product[];
  categories: Category[];
  products: Product[];
  productsCopy: Product[]; // keep as a copy for reset
  filteredByCategory: FilteredProductsByCategory[];
}

interface FilterFunctionPayload {
  priceOrder: "asc" | "desc";
  category?: string; // assuming category is a string, adjust the type as needed
}

const initialState: ProductState = {
  status: "idle" as AsyncThunkStatus,
  error: "",
  searchResult: [],
  categories: [],
  products: [],
  productsCopy: [], // keep as a copy for reset
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterAndSort: (
      state: ProductState,
      action: PayloadAction<FilterFunctionPayload>
    ) => {
      const { priceOrder, category } = action.payload;

      state.products = state.productsCopy;
      if (category !== "") {
        state.products = state.products.filter(
          (product: Product) => product.category.name === category
        );
      } else {
        state.products = state.productsCopy;
      }

      if (priceOrder === "asc") {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else if (priceOrder === "desc") {
        state.products = state.products.sort((a, b) => b.price - a.price);
      }
    },
    filterProductsByName: (
      state: ProductState,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        /* Mock Data */
        state.products = mockProducts;
        state.productsCopy = mockProducts;

        /* API */
        // state.products = action.payload;
        // state.productsCopy = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = mockCategory;
        // state.categories = action.payload; // API
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

export const { filterAndSort, filterProductsByName } = productSlice.actions;
export default productSlice.reducer;
