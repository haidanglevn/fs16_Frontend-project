import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import Register from "./components/Register";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import ProductSingle from "./pages/ProductSingle";
import CreateOrderPage from "./pages/CreateOrderPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateNewProductPage from "./pages/CreateNewProductPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProductPage />,
        },
        { path: "/product/:productId", element: <ProductSingle /> },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin",
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/create-product",
          element: (
            <ProtectedRoute>
              <CreateNewProductPage />
            </ProtectedRoute>
          ),
        },
        { path: "/cart", element: <CartPage /> },
        { path: "/order", element: <CreateOrderPage /> },
        { path: "/register", element: <Register /> },
      ],
      // errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
