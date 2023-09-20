import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const initialState = {
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null as string | null | undefined,
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
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
