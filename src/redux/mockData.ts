import { Category, Product } from "../types/productSlice";

export const mockCategory: Category[] = [
  {
    id: 1,
    image: "",
    name: "Electronics",
  },
  {
    id: 2,
    image: "",
    name: "Home",
  },
  {
    id: 3,
    image: "",
    name: "Clothes",
  },
  {
    id: 4,
    image: "",
    name: "Accessories",
  },
  {
    id: 5,
    image: "",
    name: "Furniture",
  },
  {
    id: 6,
    image: "",
    name: "Others",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Sleek Wireless Mouse",
    price: 29.99,
    description:
      "High DPI precision, comfortable grip, and long-lasting battery life.",
    category: {
      id: 1,
      image: "",
      name: "Electronics",
    },
    images: [
      "https://source.unsplash.com/500x400/?Mouse",
      "https://source.unsplash.com/500x400/?Electronics",
      "https://source.unsplash.com/500x400/?Electronics",
    ],
    creationAt: "2023-09-01T10:30:00Z",
    updatedAt: "2023-09-10T11:00:00Z",
  },
  {
    id: 2,
    title: "Cozy Wool Blanket",
    price: 49.99,
    description: "Warm, lightweight, and easy to clean.",
    category: {
      id: 2,
      image: "",
      name: "Home",
    },
    images: [
      "https://source.unsplash.com/500x400/?Blanket",
      "https://source.unsplash.com/500x400/?Wool",
      "https://source.unsplash.com/500x400/?Home",
    ],
    creationAt: "2023-08-15T08:00:00Z",
    updatedAt: "2023-08-20T09:00:00Z",
  },
  {
    id: 3,
    title: "Stylish Running Shoes",
    price: 89.99,
    description: "Cushioned, breathable, and stylish.",
    category: {
      id: 3,
      image: "",
      name: "Clothes",
    },
    images: [
      "https://source.unsplash.com/500x400/?Shoes",
      "https://source.unsplash.com/500x400/?Running",
      "https://source.unsplash.com/500x400/?Sports",
    ],
    creationAt: "2023-07-22T07:00:00Z",
    updatedAt: "2023-07-30T08:00:00Z",
  },
  {
    id: 4,
    title: "Classic Leather Watch",
    price: 120.0,
    description: "Timeless design, precision, and durability.",
    category: {
      id: 4,
      image: "",
      name: "Accessories",
    },
    images: [
      "https://source.unsplash.com/500x400/?Watch",
      "https://source.unsplash.com/500x400/?Accessories",
      "https://source.unsplash.com/500x400/?Leather",
    ],
    creationAt: "2023-06-12T05:30:00Z",
    updatedAt: "2023-06-20T06:00:00Z",
  },
  {
    id: 5,
    title: "Ergonomic Office Chair",
    price: 150.0,
    description: "Comfortable and adjustable for long working hours.",
    category: {
      id: 5,
      image: "",
      name: "Furniture",
    },
    images: [
      "https://source.unsplash.com/500x400/?Chair",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?Office",
    ],
    creationAt: "2023-05-18T04:00:00Z",
    updatedAt: "2023-05-26T04:30:00Z",
  },
  {
    id: 6,
    title: "Stainless Steel Cooking Set",
    price: 200.0,
    description: "High-quality, durable, and easy to clean.",
    category: {
      id: 2,
      image: "",
      name: "Home",
    },
    images: [
      "https://source.unsplash.com/500x400/?Kitchen",
      "https://source.unsplash.com/500x400/?Kitchen",
      "https://source.unsplash.com/500x400/?Kitchen",
    ],
    creationAt: "2023-04-21T03:00:00Z",
    updatedAt: "2023-04-29T03:30:00Z",
  },
  {
    id: 7,
    title: "Acoustic Guitar",
    price: 350.0,
    description: "Great sound quality and durable wood construction.",
    category: {
      id: 6,
      image: "",
      name: "Others",
    },
    images: [
      "https://source.unsplash.com/500x400/?Music",
      "https://source.unsplash.com/500x400/?Music",
      "https://source.unsplash.com/500x400/?Music",
    ],
    creationAt: "2023-03-15T02:00:00Z",
    updatedAt: "2023-03-23T02:30:00Z",
  },
  {
    id: 8,
    title: "Yoga Mat",
    price: 25.0,
    description: "Non-slip, cushioned, and eco-friendly.",
    category: {
      id: 6,
      image: "",
      name: "Others",
    },
    images: [
      "https://source.unsplash.com/500x400/?Fitness",
      "https://source.unsplash.com/500x400/?Yoga",
      "https://source.unsplash.com/500x400/?Fitness",
    ],
    creationAt: "2023-02-10T01:00:00Z",
    updatedAt: "2023-02-18T01:30:00Z",
  },
  {
    id: 9,
    title: "Ceramic Flower Pot",
    price: 18.0,
    description: "Stylish and durable for indoor and outdoor use.",
    category: {
      id: 2,
      image: "",
      name: "Home",
    },
    images: [
      "https://source.unsplash.com/500x400/?Flower Pot",
      "https://source.unsplash.com/500x400/?Ceramic",
      "https://source.unsplash.com/500x400/?Garden",
    ],
    creationAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-13T00:30:00Z",
  },
  {
    id: 10,
    title: "Watercolor Paint Set",
    price: 22.99,
    description: "Vibrant colors and high-quality pigments.",
    category: {
      id: 6,
      image: "",
      name: "Others",
    },
    images: [
      "https://source.unsplash.com/500x400/?Art",
      "https://source.unsplash.com/500x400/?Paint",
      "https://source.unsplash.com/500x400/?Watercolor",
    ],
    creationAt: "2022-12-01T12:00:00Z",
    updatedAt: "2022-12-09T12:30:00Z",
  },
  {
    id: 11,
    title: "Stylish Jacket",
    price: 120.0,
    description: "A stylish jacket for cold weather.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Jacket",
      "https://source.unsplash.com/500x400/?Clothes",
      "https://source.unsplash.com/500x400/?Coat",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 12,
    title: "Elegant Dress",
    price: 80.0,
    description: "An elegant dress suitable for special occasions.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Dress",
      "https://source.unsplash.com/500x400/?Clothes",
      "https://source.unsplash.com/500x400/?EveningDress",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 13,
    title: "Casual Shirt",
    price: 45.0,
    description: "A casual shirt for everyday wear.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Shirt",
      "https://source.unsplash.com/500x400/?Clothes",
      "https://source.unsplash.com/500x400/?Casual",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 14,
    title: "Running Shoes",
    price: 100.0,
    description: "Comfortable running shoes with great support.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Shoes",
      "https://source.unsplash.com/500x400/?Clothes",
      "https://source.unsplash.com/500x400/?RunningShoes",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 15,
    title: "Leather Belt",
    price: 30.0,
    description: "A durable leather belt.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Belt",
      "https://source.unsplash.com/500x400/?Clothes",
      "https://source.unsplash.com/500x400/?Leather",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 16,
    title: "Modern Sofa",
    price: 750.0,
    description: "A comfortable and modern sofa for your living room.",
    category: { id: 5, name: "Furniture" },
    images: [
      "https://source.unsplash.com/500x400/?Sofa",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?Couch",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 17,
    title: "Wooden Dining Table",
    price: 500.0,
    description: "A sturdy wooden dining table.",
    category: { id: 5, name: "Furniture" },
    images: [
      "https://source.unsplash.com/500x400/?Table",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?DiningTable",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 18,
    title: "Office Chair",
    price: 150.0,
    description: "A comfortable chair for your workspace.",
    category: { id: 5, name: "Furniture" },
    images: [
      "https://source.unsplash.com/500x400/?Chair",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?OfficeChair",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 19,
    title: "Bookshelf",
    price: 200.0,
    description: "A spacious bookshelf for your books and decorations.",
    category: { id: 5, name: "Furniture" },
    images: [
      "https://source.unsplash.com/500x400/?Bookshelf",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?Shelf",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 20,
    title: "Bedside Table",
    price: 100.0,
    description: "A practical bedside table with drawers.",
    category: { id: 5, name: "Furniture" },
    images: [
      "https://source.unsplash.com/500x400/?Table",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?BedsideTable",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 21,
    title: "Laptop",
    price: 1200,
    description:
      "High-performance laptop with fast processing speeds and ample storage.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Laptop",
      "https://source.unsplash.com/500x400/?Computer",
      "https://source.unsplash.com/500x400/?Device",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 22,
    title: "Headphones",
    price: 150,
    description:
      "Wireless noise-cancelling headphones with high-quality sound.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Headphones",
      "https://source.unsplash.com/500x400/?Audio",
      "https://source.unsplash.com/500x400/?Music",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 23,
    title: "Smartwatch",
    price: 300,
    description:
      "Smartwatch with fitness tracking and customizable watch faces.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Smartwatch",
      "https://source.unsplash.com/500x400/?Watch",
      "https://source.unsplash.com/500x400/?Gadget",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 24,
    title: "Camera",
    price: 800,
    description:
      "Digital camera with high-resolution imaging and versatile lens options.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Camera",
      "https://source.unsplash.com/500x400/?Photography",
      "https://source.unsplash.com/500x400/?DSLR",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 25,
    title: "Drone",
    price: 500,
    description:
      "Compact drone with high-quality camera and easy-to-use controls.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Drone",
      "https://source.unsplash.com/500x400/?Flying",
      "https://source.unsplash.com/500x400/?Quadcopter",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 26,
    title: "Sofa",
    price: 950,
    description:
      "Comfortable three-seater sofa with plush cushions and durable fabric.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Sofa",
      "https://source.unsplash.com/500x400/?Furniture",
      "https://source.unsplash.com/500x400/?Living Room",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 27,
    title: "Coffee Table",
    price: 150,
    description:
      "Stylish wooden coffee table with a smooth finish and spacious shelf.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Coffee Table",
      "https://source.unsplash.com/500x400/?Table",
      "https://source.unsplash.com/500x400/?Furniture",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 28,
    title: "Bed",
    price: 1200,
    description: "Queen-size bed with a comfortable mattress and sturdy frame.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Bed",
      "https://source.unsplash.com/500x400/?Bedroom",
      "https://source.unsplash.com/500x400/?Furniture",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 29,
    title: "Dining Table Set",
    price: 800,
    description:
      "Six-seater dining table set with cushioned chairs and a polished table.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Dining Table",
      "https://source.unsplash.com/500x400/?Chairs",
      "https://source.unsplash.com/500x400/?Furniture",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 30,
    title: "Desk Lamp",
    price: 45,
    description: "LED desk lamp with adjustable brightness and sleek design.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Desk Lamp",
      "https://source.unsplash.com/500x400/?Lamp",
      "https://source.unsplash.com/500x400/?Lighting",
    ],
    creationAt: "2023-09-28T08:00:00Z",
    updatedAt: "2023-09-28T08:00:00Z",
  },
  {
    id: 31,
    title: "Leather Wallet",
    price: 50,
    description:
      "Compact leather wallet with multiple card slots and a coin pocket.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Wallet",
      "https://source.unsplash.com/500x400/?Leather Wallet",
      "https://source.unsplash.com/500x400/?Leather",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 32,
    title: "Sunglasses",
    price: 85,
    description:
      "Fashionable sunglasses with UV protection and durable frames.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Sunglasses",
      "https://source.unsplash.com/500x400/?Fashion",
      "https://source.unsplash.com/500x400/?Glasses",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 33,
    title: "Scarf",
    price: 35,
    description: "Warm and cozy scarf made from high-quality wool.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Scarf",
      "https://source.unsplash.com/500x400/?Wool",
      "https://source.unsplash.com/500x400/?Winter",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 34,
    title: "Watch",
    price: 200,
    description:
      "Elegant wristwatch with a stainless steel strap and water-resistant design.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Watch",
      "https://source.unsplash.com/500x400/?Wristwatch",
      "https://source.unsplash.com/500x400/?Timepiece",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 35,
    title: "Belt",
    price: 40,
    description: "Durable leather belt with an adjustable buckle.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Belt",
      "https://source.unsplash.com/500x400/?Leather",
      "https://source.unsplash.com/500x400/?Fashion",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 36,
    title: "Yoga Mat",
    price: 30,
    description:
      "Non-slip yoga mat for a comfortable and safe workout experience.",
    category: { id: 6, name: "Others" },
    images: [
      "https://source.unsplash.com/500x400/?Yoga Mat",
      "https://source.unsplash.com/500x400/?Fitness",
      "https://source.unsplash.com/500x400/?Workout",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 37,
    title: "Gardening Kit",
    price: 60,
    description:
      "Complete gardening kit including gloves, trowel, pruners, and seeds.",
    category: { id: 6, name: "Others" },
    images: [
      "https://source.unsplash.com/500x400/?Gardening",
      "https://source.unsplash.com/500x400/?Plants",
      "https://source.unsplash.com/500x400/?Outdoor",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 38,
    title: "Paint Set",
    price: 45,
    description:
      "Acrylic paint set with a variety of colors and brushes for artistic creations.",
    category: { id: 6, name: "Others" },
    images: [
      "https://source.unsplash.com/500x400/?Paint",
      "https://source.unsplash.com/500x400/?Art",
      "https://source.unsplash.com/500x400/?Creativity",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 39,
    title: "Travel Mug",
    price: 25,
    description:
      "Insulated travel mug to keep your beverages at the perfect temperature.",
    category: { id: 6, name: "Others" },
    images: [
      "https://source.unsplash.com/500x400/?Travel Mug",
      "https://source.unsplash.com/500x400/?Coffee",
      "https://source.unsplash.com/500x400/?Drinkware",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 40,
    title: "Puzzle Set",
    price: 20,
    description:
      "Challenging puzzle set with vibrant images for hours of entertainment.",
    category: { id: 6, name: "Others" },
    images: [
      "https://source.unsplash.com/500x400/?Puzzle",
      "https://source.unsplash.com/500x400/?Game",
      "https://source.unsplash.com/500x400/?Entertainment",
    ],
    creationAt: "2023-09-29T08:00:00Z",
    updatedAt: "2023-09-29T08:00:00Z",
  },
  {
    id: 41,
    title: "Summer Floral Dress",
    price: 50,
    description:
      "Lightweight floral dress perfect for warm weather and outdoor events.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Summer Dress",
      "https://source.unsplash.com/500x400/?Floral Dress",
      "https://source.unsplash.com/500x400/?Outdoor",
    ],
    creationAt: "2023-09-29T09:00:00Z",
    updatedAt: "2023-09-29T09:00:00Z",
  },
  {
    id: 42,
    title: "Casual Denim Jacket",
    price: 70,
    description:
      "Versatile denim jacket that pairs well with any casual outfit.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Denim Jacket",
      "https://source.unsplash.com/500x400/?Casual",
      "https://source.unsplash.com/500x400/?Jacket",
    ],
    creationAt: "2023-09-29T09:00:00Z",
    updatedAt: "2023-09-29T09:00:00Z",
  },
  {
    id: 43,
    title: "Gym Leggings",
    price: 40,
    description:
      "Stretchable and breathable leggings suitable for all kinds of workouts.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Leggings",
      "https://source.unsplash.com/500x400/?Gym",
      "https://source.unsplash.com/500x400/?Fitness",
    ],
    creationAt: "2023-09-29T09:00:00Z",
    updatedAt: "2023-09-29T09:00:00Z",
  },
  {
    id: 44,
    title: "Knit Sweater",
    price: 55,
    description: "Cozy knit sweater to keep you warm in cooler weather.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Sweater",
      "https://source.unsplash.com/500x400/?Knit",
      "https://source.unsplash.com/500x400/?Winter",
    ],
    creationAt: "2023-09-29T09:00:00Z",
    updatedAt: "2023-09-29T09:00:00Z",
  },
  {
    id: 45,
    title: "Men's Suit",
    price: 150,
    description: "Elegant men's suit for a polished and professional look.",
    category: { id: 3, name: "Clothes" },
    images: [
      "https://source.unsplash.com/500x400/?Suit",
      "https://source.unsplash.com/500x400/?Formal",
      "https://source.unsplash.com/500x400/?Elegant",
    ],
    creationAt: "2023-09-29T09:00:00Z",
    updatedAt: "2023-09-29T09:00:00Z",
  },
  {
    id: 46,
    title: "Wireless Earbuds",
    price: 80,
    description:
      "Compact and high-quality wireless earbuds with noise cancellation.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Wireless Earbuds",
      "https://source.unsplash.com/500x400/?Earphones",
      "https://source.unsplash.com/500x400/?Audio",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 47,
    title: "Portable Charger",
    price: 25,
    description:
      "Powerful portable charger to keep your devices powered on the go.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Portable Charger",
      "https://source.unsplash.com/500x400/?Charger",
      "https://source.unsplash.com/500x400/?Power Bank",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 48,
    title: "Gaming Monitor",
    price: 300,
    description:
      "High-resolution gaming monitor with fast refresh rate for a smooth gaming experience.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Gaming Monitor",
      "https://source.unsplash.com/500x400/?Monitor",
      "https://source.unsplash.com/500x400/?Display",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 49,
    title: "Bluetooth Speaker",
    price: 45,
    description:
      "Portable Bluetooth speaker with excellent sound quality and bass.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Bluetooth Speaker",
      "https://source.unsplash.com/500x400/?Speaker",
      "https://source.unsplash.com/500x400/?Audio",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 50,
    title: "Smartwatch",
    price: 200,
    description:
      "Feature-rich smartwatch to keep you connected and monitor your health and fitness.",
    category: { id: 1, name: "Electronics" },
    images: [
      "https://source.unsplash.com/500x400/?Smartwatch",
      "https://source.unsplash.com/500x400/?Watch",
      "https://source.unsplash.com/500x400/?Fitness",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 51,
    title: "Cozy Blanket",
    price: 30,
    description:
      "Soft and warm blanket for cozy evenings and a touch of comfort.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Blanket",
      "https://source.unsplash.com/500x400/?Cozy",
      "https://source.unsplash.com/500x400/?Warm",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 52,
    title: "Aromatic Candles",
    price: 15,
    description: "Set of aromatic candles for a calming and relaxing ambiance.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Candles",
      "https://source.unsplash.com/500x400/?Aromatic",
      "https://source.unsplash.com/500x400/?Relaxing",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 53,
    title: "Decorative Wall Clock",
    price: 50,
    description:
      "Stylish and functional wall clock to enhance your living space.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Wall Clock",
      "https://source.unsplash.com/500x400/?Clock",
      "https://source.unsplash.com/500x400/?Decorative",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 54,
    title: "Ceramic Plant Pot",
    price: 20,
    description: "Elegant ceramic pot for your favorite indoor plants.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Plant Pot",
      "https://source.unsplash.com/500x400/?Ceramic",
      "https://source.unsplash.com/500x400/?Plants",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 55,
    title: "Cushion Cover Set",
    price: 25,
    description:
      "Set of decorative cushion covers to refresh your living room decor.",
    category: { id: 2, name: "Home" },
    images: [
      "https://source.unsplash.com/500x400/?Cushion Covers",
      "https://source.unsplash.com/500x400/?Cushions",
      "https://source.unsplash.com/500x400/?Decor",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 56,
    title: "Elegant Watch",
    price: 150,
    description: "Stylish and elegant watch, perfect for every occasion.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Watch",
      "https://source.unsplash.com/500x400/?Elegant",
      "https://source.unsplash.com/500x400/?Stylish",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 57,
    title: "Leather Wallet",
    price: 45,
    description: "Durable and sleek leather wallet with multiple compartments.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Wallet",
      "https://source.unsplash.com/500x400/?Leather",
      "https://source.unsplash.com/500x400/?Durable",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 58,
    title: "Sunglasses",
    price: 80,
    description: "Fashionable sunglasses offering 100% UV protection.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Sunglasses",
      "https://source.unsplash.com/500x400/?Fashionable",
      "https://source.unsplash.com/500x400/?UV Protection",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 59,
    title: "Silver Necklace",
    price: 120,
    description: "Beautiful silver necklace, a great addition to any outfit.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Necklace",
      "https://source.unsplash.com/500x400/?Silver",
      "https://source.unsplash.com/500x400/?Beautiful",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
  {
    id: 60,
    title: "Scarf",
    price: 35,
    description: "Soft and warm scarf, perfect for the chilly weather.",
    category: { id: 4, name: "Accessories" },
    images: [
      "https://source.unsplash.com/500x400/?Scarf",
      "https://source.unsplash.com/500x400/?Soft",
      "https://source.unsplash.com/500x400/?Warm",
    ],
    creationAt: "2023-09-30T09:00:00Z",
    updatedAt: "2023-09-30T09:00:00Z",
  },
];

export const mockProductsTest: Product[] = [
  {
    id: 1,
    title: "Sleek Wireless Mouse",
    price: 29.99,
    description:
      "High DPI precision, comfortable grip, and long-lasting battery life.",
    category: {
      id: 1,
      image: "",
      name: "Electronics",
    },
    images: [
      "https://source.unsplash.com/500x400/?Mouse",
      "https://source.unsplash.com/500x400/?Electronics",
      "https://source.unsplash.com/500x400/?Electronics",
    ],
    creationAt: "2023-09-01T10:30:00Z",
    updatedAt: "2023-09-10T11:00:00Z",
  },
  {
    id: 2,
    title: "Cozy Wool Blanket",
    price: 49.99,
    description: "Warm, lightweight, and easy to clean.",
    category: {
      id: 2,
      image: "",
      name: "Home",
    },
    images: [
      "https://source.unsplash.com/500x400/?Blanket",
      "https://source.unsplash.com/500x400/?Wool",
      "https://source.unsplash.com/500x400/?Home",
    ],
    creationAt: "2023-08-15T08:00:00Z",
    updatedAt: "2023-08-20T09:00:00Z",
  },
  {
    id: 3,
    title: "Stylish Running Shoes",
    price: 89.99,
    description: "Cushioned, breathable, and stylish.",
    category: {
      id: 3,
      image: "",
      name: "Clothes",
    },
    images: [
      "https://source.unsplash.com/500x400/?Shoes",
      "https://source.unsplash.com/500x400/?Running",
      "https://source.unsplash.com/500x400/?Sports",
    ],
    creationAt: "2023-07-22T07:00:00Z",
    updatedAt: "2023-07-30T08:00:00Z",
  },
];

export const mockUser = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://i.imgur.com/M3QKiC5.jpeg",
    creationAt: "2023-10-04T19:19:20.000Z",
    updatedAt: "2023-10-04T19:19:20.000Z",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://i.imgur.com/O1LUkwy.jpeg",
    creationAt: "2023-10-04T19:19:20.000Z",
    updatedAt: "2023-10-04T19:19:20.000Z",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://i.imgur.com/lVH533g.jpeg",
    creationAt: "2023-10-04T19:19:20.000Z",
    updatedAt: "2023-10-04T19:19:20.000Z",
  },
];

export const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5NjQxMDk1OCwiZXhwIjoxNjk2NDQ2OTU4fQ.X22XZknxsoOjM0AKYAx19W66yCTmep9YmuiBu8xXH90";
