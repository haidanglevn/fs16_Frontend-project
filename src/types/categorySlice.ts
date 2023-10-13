import { AsyncThunkStatus } from "./productSlice";

export interface Category {
  id: number;
  name: string;
  image?: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface CategoryState {
  status: AsyncThunkStatus;
  error: string;
  categories: Category[];
}
