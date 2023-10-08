import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types/types";
import { RootState } from "../store";
import { toast } from "react-toastify";

const savedCart = localStorage.getItem("cart");
const initialState = {
  cart: savedCart ? (JSON.parse(savedCart) as CartItem[]) : ([] as CartItem[]),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: typeof initialState, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success(`Item has been added to cart: ${action.payload.title}`);
      } else {
        state.cart[index].quantity++;
        toast.success(
          `Item quantity updated: ${action.payload.title} x${state.cart[index].quantity}`
        );
      }
    },

    removeFromCart: (
      state: typeof initialState,
      action: PayloadAction<Product>
    ) => {
      const index = state.cart.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      toast.success(`Item has been removed from cart: ${action.payload.title}`);
      state.cart.splice(index, 1);
    },

    emptyCart: (state: typeof initialState) => {
      state.cart = [];
    },

    increaseQuantity: (
      state: typeof initialState,
      action: PayloadAction<Product>
    ) => {
      const index = state.cart.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      state.cart[index].quantity++;
    },
    decreaseQuantity: (
      state: typeof initialState,
      action: PayloadAction<Product>
    ) => {
      const index = state.cart.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      state.cart[index].quantity--;
      if (state.cart[index].quantity === 0) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
