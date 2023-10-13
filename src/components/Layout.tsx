import Header from "./Header";
import { Provider } from "react-redux";
import store from "../redux/store";
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
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: mode,

      ...(mode === "light"
        ? {
            // Light mode color
            primary: {
              main: "#10567E",
            },
            secondary: {
              main: "#3D8CB1",
            },
            warning: {
              main: "#FF7D1A",
            },
            background: {
              paper: "#FFFFFF",
            },
            text: {
              primary: "#1D1C1D",
            },
          }
        : {
            // Dark mode color
            primary: {
              main: "#002944",
            },
            secondary: {
              main: "#36647E",
            },
            warning: {
              main: "#FF7D1A",
            },
            background: {
              paper: "#1A1D21",
            },
            text: {
              primary: "#D9D9D9",
            },
          }),
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
          theme={mode === "dark" ? "dark" : "light"}
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
