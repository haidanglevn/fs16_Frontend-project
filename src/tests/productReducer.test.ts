import {
  FilterFunctionPayload,
  ProductState,
  fetchCategories,
  fetchProducts,
  filterAndSort,
  filterProductsByName,
  productSlice,
} from "../redux/slices/productSlice";
import { server } from "../mocks/server.js";
import store from "../redux/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Category, Product } from "../types/types";
import { mockCategory, mockProducts } from "../redux/mockData";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
const initialState: ProductState = {
  status: "idle",
  error: "",
  searchResult: [],
  categories: [],
  products: [],
  productsCopy: [], // keep as a copy for reset
  filteredByCategory: [],
};
describe("productReducer", () => {
  test("Should return initial state", () => {
    expect(store.getState().product.products).toMatchObject([]);
  });

  test("Should filter product by name", () => {
    const newInitialState = {
      ...initialState,
      products: [
        {
          id: 1,
          title: "Sleek Wireless Mouse",
          price: 29.99,
          description:
            "High DPI precision, comfortable grip, and long-lasting battery life.",
          category: {
            id: 1,
            image: "",
            name: "Electronics",
          },
          images: [
            "https://source.unsplash.com/500x400/?Mouse",
            "https://source.unsplash.com/500x400/?Electronics",
            "https://source.unsplash.com/500x400/?Electronics",
          ],
          creationAt: "2023-09-01T10:30:00Z",
          updatedAt: "2023-09-10T11:00:00Z",
        },
        {
          id: 2,
          title: "Cozy Wool Blanket",
          price: 49.99,
          description: "Warm, lightweight, and easy to clean.",
          category: {
            id: 2,
            image: "",
            name: "Home",
          },
          images: [
            "https://source.unsplash.com/500x400/?Blanket",
            "https://source.unsplash.com/500x400/?Wool",
            "https://source.unsplash.com/500x400/?Home",
          ],
          creationAt: "2023-08-15T08:00:00Z",
          updatedAt: "2023-08-20T09:00:00Z",
        },
        {
          id: 3,
          title: "Stylish Running Shoes",
          price: 89.99,
          description: "Cushioned, breathable, and stylish.",
          category: {
            id: 3,
            image: "",
            name: "Clothes",
          },
          images: [
            "https://source.unsplash.com/500x400/?Shoes",
            "https://source.unsplash.com/500x400/?Running",
            "https://source.unsplash.com/500x400/?Sports",
          ],
          creationAt: "2023-07-22T07:00:00Z",
          updatedAt: "2023-07-30T08:00:00Z",
        },
      ],
    };
    const searchTerm = "shoes";
    const action: PayloadAction<string> = {
      type: filterProductsByName.type,
      payload: searchTerm,
    };

    const newState = productSlice.reducer(newInitialState, action);

    expect(newState.searchResult.length).toBe(1);
  });

  test("Should sort by price order and filter by category", () => {
    const newInitialState = {
      ...initialState,
      products: mockProducts,
      productsCopy: mockProducts,
    };
    const action: PayloadAction<FilterFunctionPayload> = {
      type: filterAndSort.type,
      payload: {
        priceOrder: "asc",
        category: "Home",
      },
    };

    const newState = productSlice.reducer(newInitialState, action);
    expect(newState.products[0]).toEqual({
      id: 52,
      title: "Aromatic Candles",
      price: 15,
      description:
        "Set of aromatic candles for a calming and relaxing ambiance.",
      category: { id: 2, name: "Home" },
      images: [
        "https://source.unsplash.com/500x400/?Candles",
        "https://source.unsplash.com/500x400/?Aromatic",
        "https://source.unsplash.com/500x400/?Relaxing",
      ],
      creationAt: "2023-09-30T09:00:00Z",
      updatedAt: "2023-09-30T09:00:00Z",
    });
  });
});

describe("Async thunk actions", () => {
  test("Should fetch all products", () => {
    const returnedActionFromFetch: PayloadAction<Product[] | Error> = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts,
    };
    const state = productSlice.reducer(initialState, returnedActionFromFetch);
    expect(state.products.length).toBe(mockProducts.length);
  });

  test("Should fetch all categories", () => {
    const returnedActionFromFetch: PayloadAction<Category[] | Error> = {
      type: fetchCategories.fulfilled.type,
      payload: mockCategory,
    };
    const state = productSlice.reducer(initialState, returnedActionFromFetch);
    expect(state.categories.length).toBe(mockCategory.length);
  });
});
