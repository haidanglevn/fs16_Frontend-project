import React, { useEffect } from "react";
import avatar from "../assets/images/image-avatar.png";
import cartIcon from "../assets/images/icon-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchUserProfile, selectUser } from "../redux/slices/userSlice";
import { Avatar, Typography } from "@mui/material";
import { User } from "../types/types";

export default function Header() {
  // The number to display on the orange dot
  const cartItemCount = useSelector(selectCart).length;
  const user: User | null = useSelector(selectUser);
  console.log("user: ", user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "0 20px",
        marginBottom: "20px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        E-commerce Website
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          gap: "20px",
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
              backgroundColor: "orange",
              borderRadius: "50%",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "5px",
              position: "absolute",
              right: "0",
              top: "0",
              transform: "translate(50%, -50%)",
              width: "15px",
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
          sx={{ cursor: "pointer" }}
        ></Avatar>
      </div>
    </div>
  );
}
