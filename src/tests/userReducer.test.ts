import { PayloadAction } from "@reduxjs/toolkit";
import { server } from "./mocks/server";
import {
  fetchUserProfile,
  LoginPayload,
  loginUser,
  userSlice,
  UserState,
} from "../redux/slices/userSlice";
import store from "../redux/store";
import { mockToken, mockUser } from "./mocks/mockData";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const initialState: UserState = {
  allUsers: [],
  user: null,
  access_token: "",
  refresh_token: "",
  loading: false,
  error: null,
};
describe("userReducer", () => {
  test("Should return initial state", () => {
    expect(store.getState().user.allUsers).toMatchObject([]);
  });

  test("Should return an access token with right credential", async () => {
    await store.dispatch(
      loginUser({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().user.access_token).toBe(mockToken);
  });

  test("Should return an status code 401 with wrong credential", async () => {
    const response = await store.dispatch(
      loginUser({ email: "john@mail.com", password: "wrongpass" })
    );
    expect(response.payload).toBe("Cannot authenticate user");
  });

  test("Should fetch user profile with the right access token", async () => {
    await store.dispatch(
      loginUser({ email: "john@mail.com", password: "changeme" })
    );
    const token = store.getState().user.access_token;
    if (token) {
      await store.dispatch(fetchUserProfile());
    }
    expect(store.getState().user.user).toStrictEqual(mockUser[0]);
  });
});
