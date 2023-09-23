import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types/types";
import { RootState } from "../store";

const initialState = {
  cart: [] as CartItem[],
};

export const addToCart = (
  state: typeof initialState,
  action: PayloadAction<Product>
) => {
  const index = state.cart.findIndex((item) => item.id === action.payload.id);
  if (index === -1) {
    state.cart.push({ ...action.payload, quantity: 1 });
  } else {
    state.cart[index].quantity++;
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { addToCart },
});

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
