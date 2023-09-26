import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  Category,
  FilteredProductsByCategory,
  Product,
} from "../../types/types";

export type AsyncThunkStatus = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as AsyncThunkStatus,
  error: null as string | null | undefined,
  searchResult: [] as Product[],
  categories: [] as Category[],
  products: [] as Product[],
  productsCopy: [] as Product[], // keep as a copy for reset
  filteredByCategory: [] as FilteredProductsByCategory[],
  filteredByCategoryCopy: [] as FilteredProductsByCategory[], // keep as a copy for reset
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data.slice(0, 180); // because there are too many fake data, has to change back later.
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return response.data.slice(0, 5);
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

// interface SortByPricePayload {
//   order: "asc" | "desc" | null;
//   anotherParameter: YourType; // Replace YourType with the actual type
// }

export const sortByPrice = (
  state: typeof initialState,
  action: PayloadAction<"asc" | "desc" | null>
) => {
  if (action.payload === "asc") {
    state.products = state.products.sort((a, b) => a.price - b.price);
    state.filteredByCategory = state.filteredByCategory.map((category) => ({
      ...category,
      products: [...category.products].sort((a, b) => a.price - b.price),
    }));
  }
  if (action.payload === "desc") {
    state.products = state.products.sort((a, b) => b.price - a.price);
    state.filteredByCategory = state.filteredByCategory.map((category) => ({
      ...category,
      products: [...category.products].sort((a, b) => b.price - a.price),
    }));
  }
  if (action.payload === null) {
    state.products = state.productsCopy;
    state.filteredByCategory = state.filteredByCategoryCopy;
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
        state.productsCopy = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        const array = state.categories.map((category: Category) => ({
          name: category.name,
          products: state.products.filter(
            (product: Product) => product.category.id === category.id
          ),
        }));
        state.filteredByCategory = array;
        state.filteredByCategoryCopy = array;
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
