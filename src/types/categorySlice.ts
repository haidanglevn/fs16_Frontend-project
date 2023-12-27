import { Category } from "./generalTypes";
import { AsyncThunkStatus } from "./productSlice";

export interface CategoryState {
  status: AsyncThunkStatus;
  error: string;
  categories: Category[];
}
