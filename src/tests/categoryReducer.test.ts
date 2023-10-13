import {
  fetchCategories,
  fetchProducts,
  filterProductsByName,
  productSlice,
} from "../redux/slices/productSlice";
import { server } from "../mocks/server";
import store from "../redux/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { mockCategory, mockProducts } from "../redux/mockData";
import { Product, ProductState } from "../types/productSlice";
import { Category, CategoryState } from "../types/categorySlice";
import { categorySlice, selectCategories } from "../redux/slices/categorySlice";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const initialState: CategoryState = {
  status: "idle",
  error: "",
  categories: [],
};

describe("categoryReducer", () => {
  test("Should return initial state", () => {
    expect(store.getState().category.categories).toMatchObject([]);
  });
});

describe("Async thunk actions", () => {
  it("should fetch categories", async () => {
    await store.dispatch(fetchCategories());
    const categories = selectCategories(store.getState());

    expect(categories).toEqual(mockCategory); // Ensure your mockCategory is imported or accessible
  });
});
