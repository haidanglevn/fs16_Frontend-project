import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types/types";
import { RootState } from "../store";

const savedCart = localStorage.getItem("cart");
const initialState = {
  cart: savedCart ? JSON.parse(savedCart) : ([] as CartItem[]),
};

const addToCart = (
  state: typeof initialState,
  action: PayloadAction<Product>
) => {
  const index = state.cart.findIndex(
    (item: CartItem) => item.id === action.payload.id
  );
  if (index === -1) {
    state.cart.push({ ...action.payload, quantity: 1 });
  } else {
    state.cart[index].quantity++;
  }
};

const emptyCart = (state: typeof initialState) => {
  state.cart = [];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart,
    emptyCart,
  },
});

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
