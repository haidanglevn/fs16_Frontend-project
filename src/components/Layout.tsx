import Header from "./Header";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "../redux/store";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

type ThemeMode = "light" | "dark";

export type ThemeChangeProps = {
  mode: ThemeMode;
  changeTheme: () => void;
};

export default function Layout() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const changeTheme = () => {
    console.log("changing mode");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: "'Kumbh Sans', sans-serif",
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
          <Header mode={mode} changeTheme={changeTheme} />
          <Outlet />
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
