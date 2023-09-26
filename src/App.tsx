import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/ProfilePage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <ProductPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/cart", element: <CartPage /> },
      ],
      // errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
