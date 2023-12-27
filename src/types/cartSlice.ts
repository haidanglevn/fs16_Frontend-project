import { Color, Size, Image } from "./generalTypes";

export interface CartItem extends SimplifiedProduct {
  quantity: number;
}

export interface SimplifiedVariant {
  color: Color;
  size: Size;
  id: string;
}

export interface SimplifiedProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  images: Image[];
  variants: SimplifiedVariant[];
}

export interface CartState {
  cart: CartItem[];
}
export interface AddToCartPayload {
  product: SimplifiedProduct;
  quantity?: number; // Optional quantity parameter
}
