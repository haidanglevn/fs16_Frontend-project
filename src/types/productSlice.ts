import { Category } from "./categorySlice";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
}

export interface FilteredProductsByCategory {
  name: string;
  products: Product[];
}

export type AsyncThunkStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProductState {
  status: AsyncThunkStatus;
  error: string;
  searchResult: Product[];
  products: Product[];
  productsCopy: Product[]; // keep as a copy for reset
}

export interface FilterFunctionPayload {
  priceOrder: "asc" | "desc";
}

export interface CreateNewProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
