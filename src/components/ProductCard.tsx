import { useDispatch, useSelector } from "react-redux";
import { Product } from "../types/productSlice";

import { AppDispatch } from "../redux/store";
import { addToCart, selectCart } from "../redux/slices/cartSlice";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { trimString } from "../ultilities/trimString";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const theme = useTheme();
  const isItemInCart = cart.some((item) => item.id === product.id);
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart({ product: item }));
  };

  return (
    <Stack
      alignItems={"center"}
      sx={{
        height: "270px",
        padding: "5px",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          border: "1px solid gray",
          borderRadius: "10px",
          width: "200px",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.id.toString()}
          style={{
            width: "100%",
            height: "160px",
            cursor: "pointer",
            borderRadius: "9px 9px 0 0",
          }}
          loading="lazy"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"10px"}
          style={{
            padding: "10px",
            maxHeight: "100%",
            maxWidth: "100%",
            overflow: "clip",
          }}
        >
          <Stack sx={{ maxWidth: "calc(100% - 45px)" }}>
            <Typography
              variant="h6"
              color={"text.primary"}
              sx={{ height: "64px", overflow: "clip" }}
            >
              {trimString(product.title)}
            </Typography>
            <Typography color={"text.primary"}>${product.price}</Typography>
          </Stack>
          <Stack alignItems={"flex-end"}>
            <IconButton
              color={isItemInCart ? "success" : "info"}
              onClick={() => handleAddToCart(product)}
              sx={{
                border: isItemInCart
                  ? "1px solid green"
                  : `1px solid ${theme.palette.text.primary}`,
                width: "45px",
                marginRight: "2px",
              }}
            >
              {isItemInCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
