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
  localStorage.setItem("access_token", store.getState().user.access_token);
  localStorage.setItem("refresh_token", store.getState().user.refresh_token);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
