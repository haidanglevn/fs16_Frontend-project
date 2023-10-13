import {
  fetchCategories,
  fetchProducts,
  filterProductsByName,
  productSlice,
} from "../redux/slices/productSlice";
import { server } from "./mocks/server";
import store from "../redux/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { mockCategory, mockProducts } from "./mocks/mockData";
import {
  FilterFunctionPayload,
  Product,
  ProductState,
} from "../types/productSlice";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockData = [
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
];

const initialState: ProductState = {
  status: "idle",
  error: "",
  searchResult: [],
  products: mockData,
  productsCopy: mockData, // keep as a copy for reset
};

describe("productReducer", () => {
  test("Should return initial state", () => {
    expect(store.getState().product.products).toMatchObject([]);
  });

  test("Should filter product by name", () => {
    const searchTerm = "shoes";
    const action: PayloadAction<string> = {
      type: filterProductsByName.type,
      payload: searchTerm,
    };

    const newState = productSlice.reducer(initialState, action);
    expect(newState.searchResult.length).toBe(1);
  });

  it("should handle sortPriceOrder for descending price", () => {
    const action = {
      type: productSlice.actions.sortPriceOrder.type,
      payload: { priceOrder: "desc", category: "" },
    };
    const newState = productSlice.reducer(initialState, action);
    const expectedFirstProduct = mockData[mockData.length - 1];
    expect(newState.products[0]).toEqual(expectedFirstProduct);
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
});
