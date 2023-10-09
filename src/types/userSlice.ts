export interface User {
  id: number;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
  name: string;
}
