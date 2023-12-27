import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, SimplifiedProduct } from "../../types/cartSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { AddToCartPayload, CartState } from "../../types/cartSlice";
import { Product } from "../../types/generalTypes";

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

      // Check if the exact variant of the product is already in the cart
      const index = state.cart.findIndex(
        (cartItem) =>
          cartItem.id === product.id &&
          cartItem.variants.some(
            (v) =>
              product.variants[0] &&
              v.color === product.variants[0].color &&
              v.size === product.variants[0].size
          )
      );

      if (index === -1) {
        // If the variant isn't in the cart, add the new product with its variant
        state.cart.push({ ...product, quantity: quantity });
        toast.success(`Item has been added to cart: ${product.title}`);
      } else {
        // If the variant is already in the cart, just update the quantity
        state.cart[index].quantity += quantity;
        toast.success(
          `Item quantity updated: ${product.title} x${state.cart[index].quantity}`
        );
      }
    },

    removeFromCart: (
      state: typeof initialState,
      action: PayloadAction<SimplifiedProduct>
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
      action: PayloadAction<SimplifiedProduct>
    ) => {
      const index = state.cart.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      state.cart[index].quantity++;
    },
    decreaseQuantity: (
      state: typeof initialState,
      action: PayloadAction<SimplifiedProduct>
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
