import { Product } from "./generalTypes";

export interface FilteredProductsByCategory {
  name: string;
  products: Product[];
}

export type AsyncThunkStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProductState {
  status: AsyncThunkStatus;
  error: string;
  access_token: string | null;
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
