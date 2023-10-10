import React, { useEffect } from "react";
import cartIcon from "../assets/images/icon-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import {
  fetchUserProfile,
  selectAccessToken,
  selectUser,
} from "../redux/slices/userSlice";
import {
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { User } from "../types/userSlice";
import {
  selectStatus,
  fetchProducts,
  fetchCategories,
} from "../redux/slices/productSlice";
import SearchBar from "./SearchBar";
import Logo from "../assets/images/Logo.svg";

export default function Header() {
  // The number to display on the orange dot
  const cartItemCount = useSelector(selectCart).length;
  const user: User | null = useSelector(selectUser);
  const accessToken: string = useSelector(selectAccessToken);

  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        backgroundColor: "#E69F56",
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
        <div style={{ position: "relative" }} onClick={() => navigate("/cart")}>
          <img
            src={cartIcon}
            alt="Cart"
            style={{ height: "30px", cursor: "pointer" }}
          />
          <div
            style={{
              backgroundColor: "#FF7D1A",
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
}
