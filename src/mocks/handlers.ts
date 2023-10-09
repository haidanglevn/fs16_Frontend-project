import { rest } from "msw";
import { mockProducts } from "../redux/mockData";

export const handlers = [
  // rest.get('https://api.escuelajs.co/api/v1/products', (req,res,ctx) => {
  //     return res(mockProducts)
  // })
];
