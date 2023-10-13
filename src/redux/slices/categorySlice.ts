import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CategoryState } from "../../types/categorySlice";
import { mockCategory } from "../../tests/mocks/mockData";

const initialState: CategoryState = {
  status: "idle",
  error: "",
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return response.data.slice(0, 7);
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // state.categories = mockCategory; // Mock Data
      state.categories = action.payload; // API
    });
  },
});

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
