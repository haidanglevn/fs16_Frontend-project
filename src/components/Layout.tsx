import React from "react";
import Header from "./Header";
import ProductPage from "../pages/ProductPage";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}
