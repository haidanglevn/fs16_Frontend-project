import { Product } from "./productSlice";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}
export interface AddToCartPayload {
  product: Product;
  quantity?: number; // Optional quantity parameter
}
