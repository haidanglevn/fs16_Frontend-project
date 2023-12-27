export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  addresses: Address[];
  reviews: Review[];
  orders: Order[];
}

export interface Product extends BaseEntity {
  title: string;
  description: string;
  price: number;
  categoryId: string;

  // Navigation properties
  category: Category;
  reviews: Review[];
  orderItems: OrderItem[];
  images: Image[];
  variants: Variant[];
}

export enum Role {
  Customer,
  Admin,
}

export interface Category extends BaseEntity {
  name: string;
  image: string;
  products: Product[];
}

export interface Address extends BaseEntity {
  country: string;
  city: string;
  state?: string;
  street: string;
  postalCode: string;
  userId: string;
}

export interface Image extends BaseEntity {
  url: string;
  productId: string;
}

export interface Order extends BaseEntity {
  status: Status;
  orderItems: OrderItem[];
}

export enum Status {
  Pending,
  Shipping,
  Received,
}

export interface Review extends BaseEntity {
  rating: number;
  comment: string;
  userId: string;
  productId: string;
}

export interface Variant extends BaseEntity {
  color: Color;
  size: Size;
  quantity: number;
  productId: string;
}

export enum Color {
  Black,
  Silver,
  Gray,
  White,
  Maroon,
  Red,
  Purple,
  Fuchsia,
  Green,
  Lime,
  Olive,
  Yellow,
  Navy,
  Blue,
  Teal,
  Aqua,
  Orange,
  AliceBlue,
  Coral,
  DarkBlue,
}

export enum Size {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXL,
}

export interface OrderItem extends BaseEntity {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}
