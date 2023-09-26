import React from "react";
import avatar from "../assets/images/image-avatar.png";
import cartIcon from "../assets/images/icon-cart.svg";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // The number to display on the orange dot
  const cart = useSelector(selectCart);
  const cartItemCount = useSelector(selectCart).length;
  console.log("cart: ", cart);

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
      <h1 onClick={() => navigate("/")}>E-commerce Website</h1>
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
        <img
          src={avatar}
          alt="User Avatar"
          style={{ height: "50px" }}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
