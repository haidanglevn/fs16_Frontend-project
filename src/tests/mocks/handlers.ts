import { rest } from "msw";
import {
  mockCategory,
  mockProducts,
  mockProductsTest,
  mockToken,
  mockUser,
} from "./mockData";

interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(mockProductsTest));
  }),

  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(mockCategory));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = mockUser.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        const token = mockToken;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),

  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const authorizationHeader = req.headers.get("Authorization");
    if (authorizationHeader && authorizationHeader.includes(mockToken)) {
      return res(ctx.json(mockUser[0]));
    } else {
      return res(ctx.status(401), ctx.text("Unauthorized"));
    }
  }),
];