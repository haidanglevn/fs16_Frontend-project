import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { mockCategory, mockProducts } from "../mockData";
import { artificialLoading } from "../utils";
import { toast } from "react-toastify";
import {
  ProductState,
  FilterFunctionPayload,
  CreateNewProductPayload,
  Category,
  Product,
} from "../../types/productSlice";

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
    return response.data.slice(0, 200);
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

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product: Product) => {
    await axios
      .put(`https://api.escuelajs.co/api/v1/products/${product.id}`, product)
      .then((res) => {
        toast.success(
          `Product id ${product.id} has been updated successfully!`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error updating product: `, err);
      });
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (product: CreateNewProductPayload) => {
    await axios
      .post("https://api.escuelajs.co/api/v1/products/", product)
      .then((response) => {
        toast.success(
          `New product with id ${response.data.id} has been created successfully!`
        );
        return response.data;
      });
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await axios
      .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        toast.success(`Product with id ${id} has been created successfully!`);
        return res.data;
      });
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = "loading";
    },
    stopLoading: (state) => {
      state.status = "succeeded";
    },
    sortAndFilter: (state, action: PayloadAction<FilterFunctionPayload>) => {
      let products = [...state.productsCopy]; // Using the copied products for filtering and sorting

      if (action.payload.category !== "") {
        products = products.filter(
          (product) => product.category.name === action.payload.category
        );
      }

      if (action.payload.priceOrder === "asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (action.payload.priceOrder === "desc") {
        products.sort((a, b) => b.price - a.price);
      }

      state.products = products;
    },
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
      });
    // .addCase(sortAndFilter.pending, (state) => {
    //   state.status = "loading";
    // });
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

export const {
  updateProducts,
  filterProductsByName,
  sortAndFilter,
  startLoading,
  stopLoading,
} = productSlice.actions;
export default productSlice.reducer;
