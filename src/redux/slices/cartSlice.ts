import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/cartSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { AddToCartPayload, CartState } from "../../types/cartSlice";
import { Product } from "../../types/productSlice";

const savedCart = localStorage.getItem("cart");
const initialState: CartState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: typeof initialState,
      action: PayloadAction<AddToCartPayload>
    ) => {
      const { product, quantity = 1 } = action.payload;

      const index = state.cart.findIndex(
        (item: CartItem) => item.id === product.id
      );
      if (index === -1) {
        state.cart.push({ ...product, quantity: quantity });
        toast.success(`Item has been added to cart: ${product.title}`);
      } else {
        state.cart[index].quantity += quantity;
        toast.success(
          `Item quantity updated: ${product.title} x${state.cart[index].quantity}`
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
