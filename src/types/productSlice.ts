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

export interface Category {
  id: number;
  name: string;
  image?: string;
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
  categories: Category[];
  products: Product[];
  productsCopy: Product[]; // keep as a copy for reset
  filteredByCategory: FilteredProductsByCategory[];
}

export interface FilterFunctionPayload {
  priceOrder: "asc" | "desc";
  category?: string; // assuming category is a string, adjust the type as needed
}

export interface CreateNewProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
