import React, { useEffect } from "react";
import cartIcon from "../assets/images/icon-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchUserProfile, selectUser } from "../redux/slices/userSlice";
import { Avatar, IconButton, Stack, useTheme } from "@mui/material";
import { User } from "../types/userSlice";
import {
  selectStatus,
  fetchProducts,
  fetchCategories,
} from "../redux/slices/productSlice";
import SearchBar from "./SearchBar";
import Logo from "../assets/images/Logo.svg";
import { useScreenSizes } from "../hooks/useScreenSizes";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ThemeChangeProps } from "./Layout";

const Header: React.FC<ThemeChangeProps> = ({ mode, changeTheme }) => {
  // The number to display on the orange dot
  const cartItemCount = useSelector(selectCart).length;
  const user: User | null = useSelector(selectUser);
  const { isMediumScreen, isLargeScreen, isSmallScreen } = useScreenSizes();

  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);
  const theme = useTheme();

  // Fetch data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={isSmallScreen ? "space-evenly" : "space-between"}
      sx={{
        height: "70px",
        padding: isLargeScreen ? "0px 40px" : "0px 100px",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <img
        src={Logo}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", height: "40px" }}
        alt="Logo"
      />
      {!isSmallScreen && <SearchBar />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          gap: isMediumScreen ? "20px" : "50px",
        }}
      >
        <IconButton onClick={changeTheme} sx={{ color: "white" }}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <div style={{ position: "relative" }} onClick={() => navigate("/cart")}>
          <IconButton sx={{ color: "white" }}>
            <ShoppingCartIcon />
          </IconButton>
          <div
            style={{
              backgroundColor: theme.palette.warning.main,
              borderRadius: "50%",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "5px",
              position: "absolute",
              right: "0",
              top: "0",
              transform: "translate(50%, -50%)",
              width: "25px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {cartItemCount}
          </div>
        </div>

        <Avatar
          alt="User avater"
          src={user?.avatar ? user.avatar : ""}
          onClick={() => navigate("/profile")}
          sx={{ cursor: "pointer", height: "40px", width: "40px" }}
        ></Avatar>
      </div>
    </Stack>
  );
};

export default Header;
