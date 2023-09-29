import Header from "./Header";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "../redux/store";
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
