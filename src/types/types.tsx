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

export interface User {
  id: number;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilteredProductsByCategory {
  name: string;
  products: Product[];
}
