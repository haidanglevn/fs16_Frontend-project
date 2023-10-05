import { useDispatch, useSelector } from "react-redux";
import { Product } from "../types/types";

import { AppDispatch } from "../redux/store";
import { addToCart, selectCart } from "../redux/slices/cartSlice";
import { Box, IconButton, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart);

  const isItemInCart = cart.some((item) => item.id === product.id);
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <Box
      sx={{
        width: "25%",
        height: "250px",
        padding: "10px",
      }}
    >
      <Stack sx={{ height: "100%", border: "1px solid gray" }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: "100%", minHeight: "150px" }}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"10px"}
          style={{
            padding: "0 10px",
            height: "100%",
          }}
        >
          <Stack>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </Stack>
          <IconButton
            color={isItemInCart ? "success" : "primary"}
            onClick={() => handleAddToCart(product)}
            sx={{
              border: isItemInCart ? "1px dotted green" : "1px dotted blue",
            }}
          >
            {isItemInCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
