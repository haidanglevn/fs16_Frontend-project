// cartSlice.test.js

import { cartSlice, selectCart } from "../redux/slices/cartSlice";
import { CartItem } from "../types/cartSlice";
import { Product } from "../types/productSlice";

describe("cartReducer", () => {
  const initialCart = {
    cart: [] as CartItem[],
  };
  const testProduct: Product = {
    id: 1,
    title: "Test product",
    category: {
      id: 1,
      image: "",
      name: "Electronics",
    },
    price: 99,
    images: [
      "https://source.unsplash.com/500x400/?Shoes",
      "https://source.unsplash.com/500x400/?Running",
      "https://source.unsplash.com/500x400/?Sports",
    ],
    description: "A test product for unit testing",
  };

  it("should handle initial state", () => {
    expect(cartSlice.reducer(undefined, { type: "unknown" })).toEqual(
      initialCart
    );
  });

  it("should handle addToCart", () => {
    const nextState = cartSlice.reducer(
      initialCart,
      cartSlice.actions.addToCart({ product: testProduct })
    );
    expect(nextState.cart).toEqual([{ ...testProduct, quantity: 1 }]);
  });

  it("should handle removeFromCart", () => {
    const stateWithProduct = { cart: [{ ...testProduct, quantity: 1 }] };
    const nextState = cartSlice.reducer(
      stateWithProduct,
      cartSlice.actions.removeFromCart(testProduct)
    );
    expect(nextState.cart).toEqual([]);
  });

  it("should handle emptyCart", () => {
    const stateWithProduct = { cart: [{ ...testProduct, quantity: 1 }] };
    const nextState = cartSlice.reducer(
      stateWithProduct,
      cartSlice.actions.emptyCart()
    );
    expect(nextState.cart).toEqual([]);
  });

  // ... similar tests for increaseQuantity and decreaseQuantity
});
