import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeFromCart,
  selectCart,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";

import { Typography, Button, Box, Stack } from "@mui/material";

export default function CartPage() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch(decreaseQuantity(item));
  };

  return (
    <Box>
      <Typography variant="h4">Your cart:</Typography>
      <Box mt={2}>
        {cart.map((item: CartItem) => (
          <Stack key={item.id} alignItems="flex-start" spacing={2}>
            <Stack direction="row" alignItems={"center"} gap={10}>
              <Button
                color="warning"
                onClick={() => handleRemoveFromCart(item)}
              >
                Delete
              </Button>
              <Typography>{item.title}:</Typography>
            </Stack>

            <Stack direction="row" alignItems={"center"} gap={10}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDecreaseQuantity(item)}
              >
                Decrease
              </Button>
              <Typography>{item.quantity}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleIncreaseQuantity(item)}
              >
                Increase
              </Button>
            </Stack>
          </Stack>
        ))}
      </Box>
      {cart.length !== 0 ? (
        <Box mt={2}>
          <Button variant="contained" color="error" onClick={handleEmptyCart}>
            Empty the cart
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography>Cart is empty</Typography>
        </Box>
      )}
    </Box>
  );
}
