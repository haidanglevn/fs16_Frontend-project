import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
// import { mockCategory, mockProducts } from "../../tests/mocks/mockData";
import { artificialLoading } from "../utils";
import { toast } from "react-toastify";
import { ProductState, FilterFunctionPayload } from "../../types/productSlice";
import { Product } from "../../types/generalTypes";
import { CreateNewProductPayload } from "../../pages/CreateNewProductPage";

const savedAccessToken = localStorage.getItem("access_token");
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const initialState: ProductState = {
  status: "idle",
  error: "",
  searchResult: [],
  access_token: savedAccessToken ? savedAccessToken : null,
  products: [],
  productsCopy: [], // keep as a copy for reset
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await artificialLoading(2000);
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product: Product, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootState).user.access_token;
    await axios
      .patch(`${API_BASE_URL}/products/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        toast.success(
          `Product id ${product.id} has been updated successfully!`
        );
      })
      .catch((err) => {
        toast.error(`Error updating product: `, err);
        return new Error(err);
      });
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (product: CreateNewProductPayload, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootState).user.access_token;
    await axios
      .post(`${API_BASE_URL}/products`, product, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
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
  async (id: string, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootState).user.access_token;
    await axios
      .delete(`${API_BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
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
    sortPriceOrder: (state, action: PayloadAction<FilterFunctionPayload>) => {
      let products = [...state.products];

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
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectSearchResult = (state: RootState) =>
  state.product.searchResult;
export const selectStatus = (state: RootState) => state.product.status;
export const selectError = (state: RootState) => state.product.error;

export const {
  updateProducts,
  filterProductsByName,
  sortPriceOrder,
  startLoading,
  stopLoading,
} = productSlice.actions;
export default productSlice.reducer;
