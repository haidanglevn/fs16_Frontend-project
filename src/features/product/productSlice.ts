import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Product } from "../../types/types";
import { act } from "react-dom/test-utils";

export type AsyncThunkStatus = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  products: [] as Product[],
  status: "idle" as AsyncThunkStatus,
  error: null as string | null | undefined,
  originProducts: [] as Product[], // keep as a copy for reset
  filterCategory: null as string | null,
  sortByPrice: null as "asc" | "desc" | null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data;
  }
);

export const filterProductsByName = (
  state: typeof initialState,
  action: PayloadAction<string>
) => {
  const searchTerm = action.payload.toLowerCase();
  state.products = state.products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
};

export const sortByPrice = (
  state: typeof initialState,
  action: PayloadAction<"asc" | "desc" | null>
) => {
  if (action.payload === "asc") {
    state.products = state.products.sort((a, b) => a.price - b.price);
  }
  if (action.payload === "desc") {
    state.products = state.products.sort((a, b) => b.price - a.price);
  }
  if (action.payload === null) {
    state.products = state.originProducts;
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortByPrice,
    filterProductsByName,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.originProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectStatus = (state: RootState) => state.product.status;
export const selectError = (state: RootState) => state.product.error;

export default productSlice.reducer;
