import Header from "./Header";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "../redux/store";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
}
