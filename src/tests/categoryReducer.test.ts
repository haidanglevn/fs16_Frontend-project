import { fetchCategories } from "../redux/slices/productSlice";
import { server } from "./mocks/server";
import store from "../redux/store";
import { mockCategory } from "./mocks/mockData";
import { selectCategories } from "../redux/slices/categorySlice";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

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
