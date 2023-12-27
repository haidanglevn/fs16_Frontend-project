import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.cart));
  const access_token = store.getState().user.access_token;
  // const refresh_token = store.getState().user.refresh_token;
  // if (access_token && refresh_token) {
  //   localStorage.setItem("access_token", access_token);
  //   localStorage.setItem("refresh_token", refresh_token);
  // }
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
