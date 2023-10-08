import { useDispatch, useSelector } from "react-redux";
import { Product } from "../types/types";

import { AppDispatch } from "../redux/store";
import { addToCart, selectCart } from "../redux/slices/cartSlice";
import { Box, IconButton, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const isItemInCart = cart.some((item) => item.id === product.id);
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <Box
      sx={{
        height: "270px",
        padding: "5px",
      }}
    >
      <Stack
        sx={{ height: "100%", border: "1px solid gray", borderRadius: "10px" }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          style={{
            width: "100%",
            minHeight: "150px",
            cursor: "pointer",
            borderRadius: "9px 9px 0 0",
          }}
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
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </Stack>
          <Stack alignItems={"flex-end"}>
            <IconButton
              color={isItemInCart ? "success" : "primary"}
              onClick={() => handleAddToCart(product)}
              sx={{
                border: isItemInCart ? "1px solid green" : "1px solid blue",
                width: "45px",
                marginRight: "2px",
              }}
            >
              {isItemInCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
