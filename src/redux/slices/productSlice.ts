import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  Category,
  FilteredProductsByCategory,
  Product,
} from "../../types/types";
import { mockCategory, mockProducts } from "../mockData";
import { artificialLoading } from "../utils";

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

export interface FilterFunctionPayload {
  priceOrder: "asc" | "desc";
  category?: string; // assuming category is a string, adjust the type as needed
}

const initialState: ProductState = {
  status: "idle",
  error: "",
  searchResult: [],
  categories: [],
  products: [],
  productsCopy: [], // keep as a copy for reset
  filteredByCategory: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await artificialLoading(2000);
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

export const sortAndFilter = createAsyncThunk(
  "products/sortAndFilter",
  async (payload: FilterFunctionPayload, { getState, dispatch }) => {
    const state: RootState = getState() as RootState;
    let products = [...state.product.productsCopy]; // Clone the array to avoid direct mutations
    await artificialLoading(500); // Wait for 2 seconds

    if (payload.category !== "") {
      products = products.filter(
        (product) => product.category.name === payload.category
      );
    }

    if (payload.priceOrder === "asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (payload.priceOrder === "desc") {
      products.sort((a, b) => b.price - a.price);
    }

    dispatch(productSlice.actions.updateProducts(products)); // Dispatch an action to update the state with the sorted/filtered products
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.status = "succeeded";
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
        // state.products = mockProducts;
        // state.productsCopy = mockProducts;

        /* API */
        state.products = action.payload;
        state.productsCopy = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        // state.categories = mockCategory; // Mock Data
        state.categories = action.payload; // API
        const array = state.categories.map((category: Category) => ({
          name: category.name,
          products: state.products.filter(
            (product: Product) => product.category.id === category.id
          ),
        }));
        state.filteredByCategory = array;
      })
      .addCase(sortAndFilter.pending, (state) => {
        state.status = "loading";
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

export const { filterProductsByName } = productSlice.actions;
export default productSlice.reducer;
